# AI Content Summariser (Frontend)

An intelligent tool that automatically generates concise summaries of articles, documents, and web content using natural language processing.

## Overview

The AI Content Summariser is designed to help users quickly extract the key information from lengthy texts. It uses state-of-the-art NLP models to analyze content and produce accurate, readable summaries while preserving the essential meaning of the original text.

This repository contains the frontend application built with Next.js. The backend API is available in a separate repository: [ai-content-summariser-api](https://github.com/dang-w/ai-content-summariser-api).

## Features

- **Text Summarisation**: Generate concise summaries from long-form content
- **URL Processing**: Extract and summarize content directly from web pages
- **Adjustable Summary Length**: Control the length of generated summaries
- **Advanced Generation Parameters**: Fine-tune the summarization with temperature and sampling controls
- **Multiple Input Methods**: Paste text directly or provide URLs for web content
- **Clean Interface**: Simple, intuitive UI for easy interaction
- **Copy & Export**: Save or share your summaries with one click
- **Caching**: Store recent summaries to avoid redundant processing
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technology Stack

- **Frontend**: React/Next.js for a responsive and interactive UI
- **Backend**: FastAPI (in separate repository)
- **NLP Models**: Leveraging transformer-based models like BART or T5 for summarisation
- **Deployment**: Vercel for frontend, Hugging Face Spaces for backend

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

### Running Locally

#### Without Docker

```bash
# Start the frontend application
npm run dev
```

Visit `http://localhost:3000` to access the application.

#### With Docker

Make sure you have both repositories cloned side by side:

## User Guide

parent-directory/
├── ai-content-summariser/
└── ai-content-summariser-api/

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

### Advanced Options

- **Minimum Length**: Controls the minimum number of characters in the summary
- **Maximum Length**: Controls the maximum number of characters in the summary
- **Use sampling**: When enabled, the model generates more creative and varied summaries
- **Temperature**: When sampling is enabled, controls the creativity level:
  - Higher values (1.5-2.0): More creative, diverse, and potentially less accurate
  - Medium values (1.0-1.4): Balanced creativity and accuracy
  - Lower values (0.7-0.9): More focused, deterministic, and potentially more accurate

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
