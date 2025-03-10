# AI Content Summariser

An intelligent tool that automatically generates concise summaries of articles, documents, and web content using natural language processing.

## Overview

The AI Content Summariser is designed to help users quickly extract the key information from lengthy texts. It uses state-of-the-art NLP models to analyze content and produce accurate, readable summaries while preserving the essential meaning of the original text.

## Features

- **Text Summarisation**: Generate concise summaries from long-form content
- **Adjustable Summary Length**: Control the length of generated summaries
- **Multiple Input Methods**: Paste text directly or provide URLs for web content
- **Clean Interface**: Simple, intuitive UI for easy interaction
- **Copy & Export**: Save or share your summaries with one click
- **Caching**: Store recent summaries to avoid redundant processing
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technology Stack

- **Frontend**: React/Next.js for a responsive and interactive UI
- **Backend**: FastAPI for efficient API endpoints
- **NLP Models**: Leveraging transformer-based models like BART or T5 for summarisation
- **Deployment**: Vercel/Netlify for frontend, Hugging Face Spaces for backend
- **Storage**: Local storage for caching recent summaries

## Implementation Approach

1. Build a clean, intuitive interface for text input and summary display
2. Implement client-side preprocessing for text cleaning and validation
3. Create efficient API endpoints for summarisation with proper error handling
4. Integrate open-source NLP models for high-quality summarisation
5. Implement caching strategies to improve performance and reduce API calls
6. Add features for adjusting summary parameters (length, style)
7. Provide options to export or share generated summaries

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dang-w/ai-content-summariser.git
cd ai-content-summariser

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

### Running Locally

```bash
# Start the backend server
cd backend
uvicorn main:app --reload

# In a separate terminal, start the frontend
cd frontend
npm run dev
```

Visit `http://localhost:3000` to access the application.

## Project Roadmap

- [x] Project setup and repository creation
- [x] Frontend UI implementation
- [x] Backend API development
- [x] Model integration
- [x] Basic summarisation functionality
- [ ] Advanced features (URL processing, adjustable parameters)
- [ ] Deployment and testing
- [ ] Performance optimization
- [ ] User feedback integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Hugging Face for providing open-source NLP models
- The transformer models community for advancing text summarisation technology
