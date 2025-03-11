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
