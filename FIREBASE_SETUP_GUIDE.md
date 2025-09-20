# Firebase & AI Services Setup Guide

## Overview
This application uses Firebase Gemini API for quiz generation and Vertex AI for skill analysis. Follow this guide to set up the required API keys and configuration.

## Required API Keys

### 1. Gemini API Key
- **Where to get**: [Google AI Studio](https://aistudio.google.com/app/apikey)
- **How to use**: Enter in the API Key Manager component in the Quiz page
- **Storage**: Saved in browser localStorage as `gemini_api_key`

### 2. Vertex AI API Key
- **Where to get**: [Google Cloud Console](https://console.cloud.google.com/)
- **Requirements**: 
  - Enable Vertex AI API in your Google Cloud project
  - Create a service account with Vertex AI permissions
  - Generate API key or use OAuth2 token
- **How to use**: Enter in the API Key Manager component in the Quiz page
- **Storage**: Saved in browser localStorage as `vertex_api_key`

## Setup Steps

### Step 1: Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Set up Vertex AI
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Vertex AI API
4. Go to "APIs & Services" → "Credentials"
5. Click "Create Credentials" → "API Key"
6. Copy the API key

### Step 3: Configure in Application
1. Navigate to the Quiz page in the application
2. Click "Configure API Keys" button
3. Enter your Gemini API key in the first field
4. Enter your Vertex AI API key in the second field
5. Click "Save Keys"

## Important Notes

### Security
- API keys are stored in browser localStorage
- Keys are only stored locally and not sent to any external servers
- For production use, consider implementing proper backend authentication

### Placeholder Mode
- The application works without API keys using placeholder data
- Real AI-powered features require valid API keys
- Placeholder quizzes will be generated if keys are not configured

### File Structure
```
src/
├── services/
│   └── aiService.ts          # Main AI service with Gemini & Vertex integration
├── components/
│   ├── ApiKeyManager.tsx     # Component for managing API keys
│   ├── QuizGenerator.tsx     # Quiz generation interface
│   └── ...
└── pages/
    └── Quiz.tsx              # Main quiz page with integrated components
```

## Troubleshooting

### Common Issues
1. **"API key not set" error**: Make sure you've entered both API keys in the API Key Manager
2. **"Failed to generate quiz"**: Check if your Gemini API key is valid and has quota remaining
3. **"Vertex AI error"**: Ensure Vertex AI API is enabled in your Google Cloud project

### API Limits
- Gemini API: Check your quota in Google AI Studio
- Vertex AI: Monitor usage in Google Cloud Console

### Testing
- Use the placeholder mode first to test the UI
- Add one API key at a time to isolate issues
- Check browser console for detailed error messages

## API Documentation Links
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Google Cloud Console](https://console.cloud.google.com/)

## Support
If you encounter issues:
1. Check the browser console for error messages
2. Verify API keys are correctly entered
3. Ensure APIs are enabled in your Google Cloud project
4. Check API quotas and billing settings