# AI Content Summariser (Frontend)

An intelligent tool that automatically generates concise summaries of articles, documents, and web content using natural language processing.

## Overview

The AI Content Summariser is designed to help users quickly extract the key information from lengthy texts. It uses state-of-the-art NLP models to analyze content and produce accurate, readable summaries while preserving the essential meaning of the original text.

This repository contains the frontend application built with Next.js. The backend API is available in a separate repository: [ai-content-summariser-api](https://github.com/dang-w/ai-content-summariser-api).

## Features

- **Text Summarisation**: Generate concise summaries from long-form content
- **URL Processing**: Extract and summarize content directly from web pages
- **Adjustable Summary Length**: Control the length of generated summaries (30-500 characters)
- **Advanced Generation Parameters**: Fine-tune the summarization with temperature (0.7-2.0) and sampling controls
- **Multiple Input Methods**: Paste text directly or provide URLs for web content
- **Clean Interface**: Simple, intuitive UI for easy interaction
- **Copy & Export**: Save or share your summaries with one click
- **Caching**: Store recent summaries to avoid redundant processing
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Status Updates**: Monitor the progress of summarization tasks

## Technology Stack

- **Frontend Framework**: React 18 with Next.js 13
- **Styling**: Tailwind CSS for responsive design
- **HTTP Client**: Axios for API communication
- **State Management**: React Hooks for local state management
- **Testing**: Jest and React Testing Library
- **Type Safety**: TypeScript for improved developer experience
- **Deployment**: Vercel for frontend, Hugging Face Spaces for backend

## Project Structure

```
ai-content-summariser/
├── src/
│   ├── components/       # UI components
│   ├── pages/            # Next.js pages
│   ├── services/         # API service layer
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   └── styles/           # Global styles and Tailwind config
├── public/               # Static assets
├── __tests__/            # Test files
├── .env.development      # Development environment variables
├── .env.production       # Production environment variables
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── jest.config.js        # Jest configuration
└── package.json          # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Docker (optional, for containerized development)

### Installation

```bash
# Clone the repository
git clone https://github.com/dang-w/ai-content-summariser.git
cd ai-content-summariser

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8000  # For local development
# NEXT_PUBLIC_API_URL=https://dang-w-ai-content-summariser-api.hf.space  # For production
```

### Running Locally

```bash
# Start the frontend application
npm run dev
```

Visit `http://localhost:3000` to access the application.

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Docker Deployment

For containerized deployment, use the provided Dockerfile.frontend:

```bash
# Build the Docker image
docker build -t ai-content-summariser-frontend -f Dockerfile.frontend .

# Run the container
docker run -p 3000:3000 ai-content-summariser-frontend
```

For a complete setup with both frontend and backend, use docker-compose:

```bash
# Start both services
docker-compose up
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## User Guide

### Summarizing Text

1. On the home page, ensure the "Text" tab is selected
2. Paste your article, document, or any text into the text area
3. Adjust the minimum and maximum length sliders to control summary length
4. (Optional) Click "Show Advanced Options" to access additional controls:
   - Toggle "Use sampling" for more creative summaries
   - Adjust the temperature slider (0.7-2.0) to control creativity level
5. Click the "Summarise" button
6. View your summary in the results section
7. Use the "Copy to Clipboard" button to copy the summary

### Summarizing Web Content

1. On the home page, click the "URL" tab
2. Enter the URL of the web page you want to summarize
3. Adjust the minimum and maximum length sliders to control summary length
4. (Optional) Click "Show Advanced Options" to access additional controls
5. Click the "Summarise" button
6. View your summary in the results section, which will include a link to the source
7. Use the "Copy to Clipboard" button to copy the summary

## Deployment

See the [deployment guide](./deployment_guide.md) for detailed instructions on deploying both the frontend and backend components.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Hugging Face for providing open-source NLP models
- The transformer models community for advancing text summarisation technology
- BeautifulSoup4 for HTML parsing capabilities
