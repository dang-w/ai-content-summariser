# AI Content Summariser: Deployment & Integration Guide

This guide provides detailed instructions for deploying, testing, and optimizing the AI Content Summariser project. It covers both the frontend and backend components, integration between them, and performance optimization strategies.

## Project Overview

The AI Content Summariser consists of two main components:

1. **Frontend** (`ai-content-summariser`): A Next.js application that provides the user interface
2. **Backend** (`ai-content-summariser-api`): A FastAPI application that handles text processing and summarization

## Project Structure

The project is split into two repositories:

1. **ai-content-summariser**: Frontend application (Next.js) + deployment documentation
2. **ai-content-summariser-api**: Backend API service (FastAPI)

Make sure you have both repositories cloned before proceeding with deployment.

## Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- Git
- Docker and Docker Compose (for containerized deployment)
- Hugging Face account (for backend deployment)
- Vercel account (for frontend deployment)

## Local Development Setup

### Backend Setup

1. Clone the backend repository:
   ```bash
   git clone https://github.com/dang-w/ai-content-summariser-api.git
   cd ai-content-summariser-api
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

5. Verify the backend is running by visiting `http://localhost:8000/health`

### Frontend Setup

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/dang-w/ai-content-summariser.git
   cd ai-content-summariser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the backend URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` to access the application

## Deployment Options

### Backend Deployment

#### Hugging Face Spaces (Recommended for ML Applications)

1. Create a new Space on Hugging Face:
   - Go to [https://huggingface.co/spaces](https://huggingface.co/spaces)
   - Click "Create new Space"
   - Enter a name (e.g., "ai-content-summariser-api")
   - Select "Docker" as the SDK
   - Choose the "Blank" Docker template
   - Set visibility and license options
   - Click "Create Space"

2. Clone the Space repository:
   ```bash
   git clone https://huggingface.co/spaces/dang-w/ai-content-summariser-api
   cd ai-content-summariser-api
   ```

3. Copy your backend code to the Space repository:
   ```bash
   # Copy all files from your local backend to the Space repository
   cp -r /path/to/ai-content-summariser-api/* .
   ```

4. Ensure your README.md has the required metadata:
   ```markdown
   ---
   title: AI Content Summariser API
   emoji: 📝
   colorFrom: blue
   colorTo: indigo
   sdk: docker
   app_port: 7860
   pinned: false
   license: mit
   ---

   # AI Content Summariser API
   ...
   ```

5. Update the Dockerfile to use port 7860 (Hugging Face Spaces default):
   ```dockerfile
   FROM python:3.9-slim

   WORKDIR /app

   # Copy requirements first for better caching
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   # Copy the rest of the application
   COPY . .

   # Expose the port
   EXPOSE 7860

   # Command to run the application
   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
   ```

6. Commit and push your code:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push
   ```

7. Configure environment variables through the Hugging Face web interface:
   - Go to your Space on huggingface.co
   - Click on "Settings"
   - Scroll down to "Repository secrets"
   - Add `CORS_ORIGINS` with your frontend URL (e.g., "https://ai-content-summariser.vercel.app")

8. Your API will be available at `https://huggingface.co/spaces/dang-w/ai-content-summariser-api`

### Frontend Deployment

#### Vercel (Recommended for Next.js)

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the frontend:
   ```bash
   cd ai-content-summariser
   vercel
   ```

4. Follow the prompts to configure your deployment

5. Set environment variables:
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   ```
   Enter your backend URL (e.g., `https://huggingface.co/spaces/your-username/ai-content-summariser-api`)

6. Deploy to production:
   ```bash
   vercel --prod
   ```

## Docker Deployment

For a complete containerized deployment using Docker Compose:

1. Ensure both repositories are cloned side by side:
   ```
   /projects/
   ├── ai-content-summariser/
   └── ai-content-summariser-api/
   ```

2. Create or update the `docker-compose.yml` file in the frontend repository:
   ```yaml
   services:
     frontend:
       build:
         context: .
         dockerfile: Dockerfile.frontend
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - NEXT_PUBLIC_API_URL=http://backend:8000
       depends_on:
         - backend

     backend:
       build:
         context: ../ai-content-summariser-api
         dockerfile: Dockerfile
       ports:
         - "8000:8000"
       environment:
         - ENVIRONMENT=production
         - CORS_ORIGINS=http://frontend:3000
   ```

3. Create a Dockerfile for the frontend:
   ```dockerfile
   # ai-content-summariser/Dockerfile.frontend
   FROM node:16-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .

   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

4. Build and run the containers:
   ```bash
   cd ai-content-summariser
   docker-compose up -d
   ```

## Local Development with Docker Compose

For local development with Docker Compose, make sure both repositories are cloned side by side:

parent-directory/
├── ai-content-summariser/
└── ai-content-summariser-api/


Then run:

```bash
cd ai-content-summariser
docker-compose up --build
```

This will start both the frontend and backend services.

## Testing Strategy

### Backend Testing

1. Create a `tests` directory in the backend repository:
   ```bash
   mkdir -p ai-content-summariser-api/tests
   ```

2. Install testing dependencies:
   ```bash
   pip install pytest pytest-cov httpx
   ```

3. Create unit tests for the summarizer service:
   ```python
   # tests/test_summariser.py
   import pytest
   from app.services.summariser import SummariserService

   def test_summariser():
       summariser = SummariserService()
       text = "This is a test paragraph that should be summarized. It contains multiple sentences with different information. The summarizer should extract the key points and generate a concise summary."
       summary = summariser.summarise(text, max_length=50, min_length=10)

       assert summary is not None
       assert len(summary) <= 50
       assert len(summary) >= 10
   ```

4. Create integration tests for the API endpoints:
   ```python
   # tests/test_api.py
   from fastapi.testclient import TestClient
   from main import app

   client = TestClient(app)

   def test_summarise_endpoint():
       response = client.post(
           "/api/summarise",
           json={
               "text": "This is a test paragraph that should be summarized.",
               "max_length": 50,
               "min_length": 10
           }
       )
       assert response.status_code == 200
       data = response.json()
       assert "summary" in data
       assert "original_text_length" in data
       assert "summary_length" in data
   ```

5. Run the tests:
   ```bash
   cd ai-content-summariser-api
   pytest
   ```

6. Generate a coverage report:
   ```bash
   pytest --cov=app tests/
   ```

### Frontend Testing

1. Install testing dependencies:
   ```bash
   cd ai-content-summariser
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. Create a Jest configuration file:
   ```js
   // jest.config.js
   module.exports = {
     testEnvironment: 'jsdom',
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     moduleNameMapper: {
       '^@/components/(.*)$': '<rootDir>/components/$1',
     },
   };
   ```

3. Create a Jest setup file:
   ```js
   // jest.setup.js
   import '@testing-library/jest-dom';
   ```

4. Create component tests:
   ```jsx
   // __tests__/components/SummaryForm.test.js
   import { render, screen, fireEvent } from '@testing-library/react';
   import SummaryForm from '../../src/components/SummaryForm';

   describe('SummaryForm', () => {
     it('renders the form correctly', () => {
       const mockSubmit = jest.fn();
       render(<SummaryForm onSubmit={mockSubmit} />);

       expect(screen.getByText('Enter text to summarise:')).toBeInTheDocument();
       expect(screen.getByRole('button', { name: 'Summarise' })).toBeInTheDocument();
     });

     it('switches between text and URL input', () => {
       const mockSubmit = jest.fn();
       render(<SummaryForm onSubmit={mockSubmit} />);

       // Initially shows text input
       expect(screen.getByLabelText('Enter text to summarise:')).toBeInTheDocument();

       // Click URL button
       fireEvent.click(screen.getByRole('button', { name: 'URL' }));

       // Now shows URL input
       expect(screen.getByLabelText('Enter URL to summarise:')).toBeInTheDocument();
     });
   });
   ```

5. Run the tests:
   ```bash
   npm test
   ```

### End-to-End Testing

1. Install Cypress:
   ```bash
   cd ai-content-summariser
   npm install --save-dev cypress
   ```

2. Initialize Cypress:
   ```bash
   npx cypress open
   ```

3. Create E2E tests:
   ```js
   // cypress/integration/summariser.spec.js
   describe('Summariser App', () => {
     beforeEach(() => {
       cy.visit('/');
     });

     it('should summarize text input', () => {
       cy.get('button').contains('Text').click();
       cy.get('textarea').type('This is a test paragraph that should be summarized. It contains multiple sentences with different information.');
       cy.get('button').contains('Summarise').click();

       // Wait for the summary to appear
       cy.get('.bg-gray-50').should('be.visible');
       cy.get('.bg-gray-50 p').should('not.be.empty');
     });

     it('should summarize URL input', () => {
       cy.get('button').contains('URL').click();
       cy.get('input[type="url"]').type('https://en.wikipedia.org/wiki/Artificial_intelligence');
       cy.get('button').contains('Summarise').click();

       // Wait for the summary to appear
       cy.get('.bg-gray-50').should('be.visible');
       cy.get('.bg-gray-50 p').should('not.be.empty');
     });
   });
   ```

4. Run the E2E tests:
   ```bash
   npx cypress run
   ```

## Performance Optimization

### Backend Optimizations

#### 1. Model Caching

Implement model caching to avoid reloading models for each request:

```python
# app/services/model_cache.py
from functools import lru_cache
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

@lru_cache(maxsize=2)
def get_model(model_name):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)
    return tokenizer, model, device
```

Update the SummariserService to use the cached model:

```python
# app/services/summariser.py
from app.services.model_cache import get_model

class SummariserService:
    def __init__(self):
        model_name = "facebook/bart-large-cnn"
        self.tokenizer, self.model, self.device = get_model(model_name)

    # Rest of the class remains the same
```

#### 2. Result Caching

Implement result caching to avoid redundant processing:

```python
# app/services/cache.py
import hashlib
from functools import lru_cache

@lru_cache(maxsize=100)
def get_cached_summary(text_hash, max_length, min_length, do_sample, temperature):
    # This is a placeholder for the actual cache lookup
    # In a real implementation, this would check a database or Redis cache
    return None

def cache_summary(text_hash, max_length, min_length, do_sample, temperature, summary):
    # This is a placeholder for the actual cache storage
    # In a real implementation, this would store in a database or Redis cache
    pass

def hash_text(text):
    return hashlib.md5(text.encode()).hexdigest()
```

Update the API routes to use the cache:

```python
# app/api/routes.py
from app.services.cache import hash_text, get_cached_summary, cache_summary

@router.post("/summarise", response_model=SummaryResponse)
async def summarise_text(request: TextSummaryRequest):
    try:
        # Check cache first
        text_hash = hash_text(request.text)
        cached_summary = get_cached_summary(
            text_hash,
            request.max_length,
            request.min_length,
            request.do_sample,
            request.temperature
        )

        if cached_summary:
            return cached_summary

        # If not in cache, generate summary
        summariser = SummariserService()
        summary = summariser.summarise(
            text=request.text,
            max_length=request.max_length,
            min_length=request.min_length,
            do_sample=request.do_sample,
            temperature=request.temperature
        )

        result = {
            "original_text_length": len(request.text),
            "summary": summary,
            "summary_length": len(summary),
            "source_type": "text"
        }

        # Cache the result
        cache_summary(
            text_hash,
            request.max_length,
            request.min_length,
            request.do_sample,
            request.temperature,
            result
        )

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

#### 3. Asynchronous Processing

Implement asynchronous processing for long-running tasks:

```python
# app/api/async_routes.py
import asyncio
import uuid
from fastapi import APIRouter, BackgroundTasks

router = APIRouter()

# In-memory storage for task results (use Redis or a database in production)
task_results = {}

async def process_summarization(task_id, request):
    try:
        summariser = SummariserService()
        summary = summariser.summarise(
            text=request.text,
            max_length=request.max_length,
            min_length=request.min_length,
            do_sample=request.do_sample,
            temperature=request.temperature
        )

        task_results[task_id] = {
            "status": "completed",
            "result": {
                "original_text_length": len(request.text),
                "summary": summary,
                "summary_length": len(summary),
                "source_type": "text"
            }
        }
    except Exception as e:
        task_results[task_id] = {
            "status": "failed",
            "error": str(e)
        }

@router.post("/summarise-async")
async def summarise_text_async(request: TextSummaryRequest, background_tasks: BackgroundTasks):
    task_id = str(uuid.uuid4())
    task_results[task_id] = {"status": "processing"}

    background_tasks.add_task(process_summarization, task_id, request)

    return {"task_id": task_id, "status": "processing"}

@router.get("/summary-status/{task_id}")
async def get_summary_status(task_id: str):
    if task_id not in task_results:
        raise HTTPException(status_code=404, detail="Task not found")

    return task_results[task_id]
```

### Frontend Optimizations

#### 1. Local Storage Caching

Implement local storage caching for recent summaries:

```javascript
// src/utils/cache.js
export function getSummaryFromCache(text, options) {
  const cacheKey = `summary-${hashString(text)}-${JSON.stringify(options)}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      const { timestamp, data } = JSON.parse(cached);
      // Check if cache is still valid (less than 24 hours old)
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        return data;
      }
    } catch (e) {
      console.error('Cache parsing error:', e);
    }
  }

  return null;
}

export function saveSummaryToCache(text, options, data) {
  const cacheKey = `summary-${hashString(text)}-${JSON.stringify(options)}`;
  localStorage.setItem(cacheKey, JSON.stringify({
    timestamp: Date.now(),
    data
  }));
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}
```

Update the main page to use the cache:

```javascript
// src/pages/index.js
import { getSummaryFromCache, saveSummaryToCache } from '../utils/cache';

// Inside the Home component
const handleSummarise = async (data) => {
  setLoading(true);
  setError(null);

  try {
    // Check cache first
    const cachedSummary = getSummaryFromCache(data.content, data.options);
    if (cachedSummary) {
      setSummary(cachedSummary);
      setLoading(false);
      return;
    }

    // If not in cache, fetch from API
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/${
      data.type === 'url' ? 'summarise-url' : 'summarise'
    }`;

    const requestBody = {
      [data.type === 'url' ? 'url' : 'text']: data.content,
      max_length: data.options.maxLength,
      min_length: data.options.minLength,
      do_sample: data.options.doSample,
      temperature: data.options.temperature
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to generate summary');
    }

    const responseData = await response.json();

    // Cache the result
    saveSummaryToCache(data.content, data.options, responseData);

    setSummary(responseData);
  } catch (err) {
    console.error('Error:', err);
    setError(err.message || 'An error occurred while generating the summary');
  } finally {
    setLoading(false);
  }
};
```

#### 2. Debouncing User Input

Create a debounce hook to prevent excessive API calls:

```javascript
// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

Use the debounce hook in the SummaryForm component:

```javascript
// src/components/SummaryForm.jsx
import { useDebounce } from '../hooks/useDebounce';

// Inside the SummaryForm component
const [text, setText] = useState('');
const debouncedText = useDebounce(text, 500);

// Use debouncedText for any real-time processing
```
```

The key changes I've made to the deployment guide are:

1. Added a clear "Project Structure" section that explains the two repositories
2. Updated the Docker Compose section to reflect the new structure (frontend at root level)
3. Added a dedicated "Local Development with Docker Compose" section
4. Updated file paths and context references throughout the document

These changes align with the reorganized project structure where the frontend code is at the root level of the `ai-content-summariser` repository and the backend is in a separate `ai-content-summariser-api` repository.
