# Bimba AI Studio

A modern AI platform for code generation, content creation, and image analysis.

## Overview

Bimba AI Studio is a cutting-edge platform that combines Google's Gemini API with your programming and content creation needs. The platform features an intuitive interface, dark/light mode, and powerful AI capabilities.

## Features

- **AI Studio**: Generate code, content, and analyze images using Google's Gemini API
- **Dark/Light Mode**: Toggle between dark and light themes (dark mode by default)
- **Multilingual Support**: Available in English, Spanish, and Portuguese
- **Code Generator**: Generate code in multiple programming languages based on text prompts
- **Image Analysis**: Upload and analyze images with AI assistance
- **Modern UI**: Clean, responsive design that works on all devices

## Project Structure

- `index.html` - Main HTML structure with AI Studio interface
- `styles.css` - CSS styling with dark/light mode support
- `script.js` - JavaScript functionality for theme switching, API integration, and response generation
- `server.js` - Simple Node.js server for local development
- `translations.js` - External translations file for multilingual support

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Open your browser and navigate to `http://localhost:3000`
5. Enter your Gemini API key in the settings
6. Start using the AI Studio to generate code, content, or analyze images

## Using the Gemini API

1. Obtain a Gemini API key from [Google AI Studio](https://ai.google.dev/)
2. Enter your API key in the settings section of Bimba AI Studio
3. Select the appropriate model:
   - `gemini-pro` for text and code generation
   - `gemini-pro-vision` for image analysis and multimodal tasks
4. Adjust the temperature setting (0-2) to control response creativity
5. Enter your prompt and generate responses

## Supported Programming Languages

- JavaScript
- Python
- HTML
- CSS
- Java
- C#
- And many more through the Gemini API

## Future Development

This platform will continue to evolve with:

- Backend integration with Flask
- Database connection with PostgreSQL
- User authentication
- More advanced AI capabilities
- Additional model integrations

## Coding Conventions

- ALL_CAPS for variables
- Minimal comments
- Incremental feature development
- Translation files for each supported language
