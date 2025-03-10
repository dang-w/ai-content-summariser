# AI Content Summariser

An intelligent tool that automatically generates concise summaries of articles, documents, and web content using natural language processing.

## Overview

The AI Content Summariser is designed to help users quickly extract the key information from lengthy texts. It uses state-of-the-art NLP models to analyze content and produce accurate, readable summaries while preserving the essential meaning of the original text.

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
- **Backend**: FastAPI for efficient API endpoints
- **NLP Models**: Leveraging transformer-based models like BART or T5 for summarisation
- **Web Scraping**: BeautifulSoup4 for extracting content from URLs
- **HTTP Client**: HTTPX for asynchronous web requests
- **Deployment**: Vercel/Netlify for frontend, Hugging Face Spaces for backend
- **Storage**: Local storage for caching recent summaries

## Implementation Approach

1. Build a clean, intuitive interface for text and URL input and summary display
2. Implement client-side preprocessing for text cleaning and validation
3. Create efficient API endpoints for summarisation with proper error handling
4. Integrate open-source NLP models for high-quality summarisation
5. Implement URL content extraction for direct web page summarization
6. Add advanced parameters for fine-tuning the summarization process
7. Implement caching strategies to improve performance and reduce API calls
8. Provide options to export or share generated summaries

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

### Advanced Options

- **Minimum Length**: Controls the minimum number of characters in the summary
- **Maximum Length**: Controls the maximum number of characters in the summary
- **Use sampling**: When enabled, the model generates more creative and varied summaries
- **Temperature**: When sampling is enabled, controls the creativity level:
  - Higher values (1.5-2.0): More creative, diverse, and potentially less accurate
  - Medium values (1.0-1.4): Balanced creativity and accuracy
  - Lower values (0.7-0.9): More focused, deterministic, and potentially more accurate

## Project Roadmap

- [x] Project setup and repository creation
- [x] Frontend UI implementation
- [x] Backend API development
- [x] Model integration
- [x] Basic summarisation functionality
- [x] Advanced features (URL processing, adjustable parameters)
- [ ] Deployment and testing
- [ ] Performance optimization
- [ ] User feedback integration

## Future Enhancements

We're planning to add the following features in upcoming releases:

### 1. History and Saved Summaries
- Save past summarizations for quick reference
- Organize summaries by categories or tags
- Export history in various formats (PDF, CSV)

### 2. Multiple Summarization Models
- Allow users to choose between different AI models
- Offer specialized models for different content types (academic, news, technical)
- Provide model comparison for the same content

### 3. Document Upload Support
- Direct upload and summarization of PDF files
- Support for DOCX, TXT, and other document formats
- Batch processing of multiple documents

### 4. Browser Extension
- One-click summarization of web pages
- Context menu integration for selected text
- Automatic summarization of open tabs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Hugging Face for providing open-source NLP models
- The transformer models community for advancing text summarisation technology
- BeautifulSoup4 for HTML parsing capabilities
