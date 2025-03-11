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

4. Create a `.env` file with the following content:
   ```
   ENVIRONMENT=development
   CORS_ORIGINS=http://localhost:3000
   ```

5. Run the backend server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

6. Verify the backend is running by visiting `http://localhost:8000/health` and `http://localhost:8000/docs`

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
   git clone https://huggingface.co/spaces/your-username/ai-content-summariser-api
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
   - Add the following environment variables:
     - `CORS_ORIGINS` with your frontend URL (e.g., "https://ai-content-summariser.vercel.app")
     - `TRANSFORMERS_CACHE=/tmp/huggingface_cache`
     - `HF_HOME=/tmp/huggingface_cache`
     - `HUGGINGFACE_HUB_CACHE=/tmp/huggingface_cache`

8. Your API will be available at `https://huggingface.co/spaces/your-username/ai-content-summariser-api`

### Frontend Deployment

#### Vercel (Recommended for Next.js)

1. Push your frontend code to a GitHub repository:
   ```bash
   cd ai-content-summariser
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/ai-content-summariser.git
   git push -u origin main
   ```

2. Sign in to [Vercel](https://vercel.com) and import your GitHub repository:
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Configure the project settings:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: npm run build
     - Output Directory: .next

3. Set environment variables:
   - Click on "Environment Variables"
   - Add `NEXT_PUBLIC_API_URL` with the value of your Hugging Face Spaces API URL
     (e.g., `https://your-username-ai-content-summariser-api.hf.space`)

4. Click "Deploy" and wait for the deployment to complete

5. Your frontend will be available at `https://ai-content-summariser.vercel.app` (or a custom domain if configured)

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

3. Ensure the Dockerfile.frontend is properly configured:
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

4. Ensure the backend Dockerfile is properly configured:
   ```dockerfile
   # ai-content-summariser-api/Dockerfile
   FROM python:3.9-slim

   WORKDIR /app

   # Copy requirements first for better caching
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   # Copy the rest of the application
   COPY . .

   # Expose the port
   EXPOSE 8000

   # Command to run the application
   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

5. Build and run the containers:
   ```bash
   cd ai-content-summariser
   docker-compose up -d
   ```

## Performance Optimization

### Backend Optimizations

1. **Model Caching**: The backend is configured to cache the NLP model in memory after the first load, significantly reducing subsequent request times.

2. **Result Caching**: Frequently requested summaries are cached to avoid redundant processing.

3. **Text Preprocessing**: Input text is cleaned and normalized before processing to improve summarization quality.

4. **Batched Processing**: Large texts are processed in batches to manage memory usage efficiently.

5. **GPU Acceleration**: If available, the backend will automatically use GPU acceleration for faster model inference.

### Frontend Optimizations

1. **Static Generation**: The Next.js frontend uses static generation for faster page loads.

2. **Client-side Caching**: Recent summaries are cached in the browser's localStorage to reduce API calls.

3. **Lazy Loading**: Components are lazy-loaded to improve initial page load time.

4. **Responsive Design**: The UI is optimized for various screen sizes using Tailwind CSS.

## Monitoring and Maintenance

### Backend Monitoring

1. **Health Checks**: Use the `/health` endpoint to monitor the backend service.

2. **Status Endpoint**: The `/api/status` endpoint provides information about model loading and current jobs.

3. **Logs**: Monitor the application logs for errors and performance issues.

### Frontend Monitoring

1. **Vercel Analytics**: Use Vercel's built-in analytics to monitor page views and performance.

2. **Error Tracking**: Implement error tracking using services like Sentry.

## Troubleshooting

### Common Backend Issues

1. **Model Loading Failures**:
   - Check if there's enough disk space for the model files
   - Verify that the TRANSFORMERS_CACHE environment variable is set correctly
   - Try using a smaller model by modifying the model_name in summariser.py

2. **Memory Issues**:
   - Increase the container memory allocation
   - Reduce the batch size for processing large texts
   - Consider using a smaller model

### Common Frontend Issues

1. **API Connection Errors**:
   - Verify that the NEXT_PUBLIC_API_URL environment variable is set correctly
   - Check if the backend service is running and accessible
   - Ensure CORS is properly configured on the backend

2. **Build Failures**:
   - Check for dependency issues in package.json
   - Verify that Node.js version is compatible with the project

## Security Considerations

1. **Rate Limiting**: Implement rate limiting on the backend to prevent abuse.

2. **Input Validation**: All user inputs are validated using Pydantic models.

3. **CORS Configuration**: CORS is configured to allow requests only from trusted origins.

4. **Environment Variables**: Sensitive configuration is stored in environment variables, not in the code.

## Future Improvements

1. **User Authentication**: Add user accounts to save and manage summaries.

2. **Multiple Language Support**: Extend the summarization capabilities to multiple languages.

3. **Custom Model Fine-tuning**: Fine-tune the summarization model for specific domains.

4. **PDF and Document Support**: Add support for uploading and summarizing PDF files and other document formats.

5. **API Key Management**: Implement API key authentication for the backend service.

## Local Development with Docker Compose

For local development with Docker Compose, make sure both repositories are cloned side by side:

```
parent-directory/
├── ai-content-summariser/
└── ai-content-summariser-api/
```

Then run:

```bash
cd ai-content-summariser
docker-compose up --build
```

This will start both the frontend and backend services.
