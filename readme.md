# Gemini Chat Web App 🤖💬

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-v19-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange.svg)](https://ai.google.dev/)

A full-stack web application that provides a clean, interactive interface for chatting with Google's Gemini AI. This project integrates Google's Generative AI capabilities through a React frontend and Node.js backend.

![Gemini Chat Demo](https://i.imgur.com/placeholder-for-your-app-screenshot.png)

## 📋 Table of Contents

- [Gemini Chat Web App 🤖💬](#gemini-chat-web-app-)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠️ Tech Stack](#️-tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Installation](#-installation)
    - [Prerequisites](#prerequisites)
    - [Setup Instructions](#setup-instructions)
  - [▶️ Running the Application](#️-running-the-application)
    - [Development Mode](#development-mode)
    - [Quick Start (with Docker)](#quick-start-with-docker)
  - [💬 How to Use](#-how-to-use)
  - [🔌 API Endpoints](#-api-endpoints)
  - [🌐 Deployment](#-deployment)
    - [Backend Deployment](#backend-deployment)
    - [Frontend Deployment](#frontend-deployment)
  - [🔗 Live Demo](#-live-demo)
    - [About the Demo](#about-the-demo)
  - [❓ Troubleshooting](#-troubleshooting)
  - [🚧 Future Improvements](#-future-improvements)
  - [📝 License](#-license)

## ✨ Features

- **Interactive Chat Interface**: Engage in natural conversations with Gemini AI
- **Conversation History**: View and continue previous conversations
- **Markdown Support**: AI responses support markdown formatting
- **Syntax Highlighting**: Code snippets in responses are properly highlighted
- **Responsive Design**: Works on both desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- React 19
- React Markdown for rendering formatted responses
- React Syntax Highlighter for code snippets
- CSS3 with responsive design principles

### Backend
- Node.js with Express
- Google Generative AI SDK
- CORS for secure cross-origin requests

## 📁 Project Structure

```
gemini-chat-web-app/
├── frontend/               # React frontend application
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # UI components
│   │   ├── styles/         # CSS styles
│   │   ├── services/       # API services
│   │   └── App.js          # Main application
│   └── package.json        # Frontend dependencies
├── backend/                # Express backend server
│   ├── server.js           # Main server file
│   ├── routes/             # API routes
│   ├── controllers/        # Request handlers
│   ├── .env                # Environment variables (not committed)
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key (get from [Google AI Studio](https://ai.google.dev/))

### Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/NawrizTurjo/gemini-chat-web-app.git
cd gemini-chat-web-app
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Configure environment variables:
    - Create a `.env` file in the backend directory
    - Add your Gemini API key:

```
GEMINI_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:3000
PORT=3001
```

4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## ▶️ Running the Application

### Development Mode

<details>
<summary><b>Start the Backend</b></summary>

```bash
cd backend
npm start
```

This will start the server on port 3001 (or your specified PORT in .env).
</details>

<details>
<summary><b>Start the Frontend</b></summary>

```bash
cd frontend
npm start
```

This will start the React development server on port 3000 and automatically open your browser.
</details>

### Quick Start (with Docker)

If you have Docker installed, you can run the entire application with:

```bash
docker-compose up
```

## 💬 How to Use

![Usage Guide](https://i.imgur.com/placeholder-for-usage-guide.gif)

1. Open the application in your browser at http://localhost:3000
2. Type your message in the input field at the bottom
3. Press Enter or click the send button to submit your question
4. The AI will respond shortly with a formatted answer
5. Continue the conversation as desired
6. Previous messages appear in the conversation history

## 🔌 API Endpoints

The backend provides the following endpoint:

- **POST /chat**: Send a message to Gemini AI
  - Request body:
     ```json
     {
        "message": "Your message here",
        "history": [
          {"role": "user", "content": "Previous user message"},
          {"role": "assistant", "content": "Previous AI response"}
        ]
     }
     ```
  - Response:
     ```json
     {
        "response": "AI response text with markdown formatting"
     }
     ```

## 🌐 Deployment

### Backend Deployment

The backend can be deployed to any Node.js hosting service like Heroku, Render, or Railway:

1. Set the environment variables on your hosting platform
2. Deploy the code from your repository
3. Make sure to update the FRONTEND_URL environment variable to match your frontend URL

### Frontend Deployment

The React frontend can be deployed to services like Netlify, Vercel, or GitHub Pages:

1. Build the production version:
    ```bash
    cd frontend
    npm run build
    ```
2. Deploy the contents of the `build` directory to your hosting service
3. Make sure to configure the backend API URL in your frontend code or environment variables

## 🔗 Live Demo

A live version of this application is deployed and available for public use. You can interact with the Gemini AI directly through the web interface:

<div align="center">
  <a href="https://gemini-chat-web-app-frontend.onrender.com/" target="_blank">
     <img src="https://i.imgur.com/placeholder-for-demo-button.png" alt="Try Now Button" width="200"/>
  </a>
</div>

### About the Demo

- The frontend is hosted on Render.com
- The backend API is also deployed on Render's cloud platform
- No account creation is required to use the demo
- The application might take a few seconds to "wake up" if it hasn't been used recently (due to Render's free tier spinning down inactive services)
- Usage limits may apply based on the Gemini API quota configured for this demo

Try it out by visiting the link and starting a conversation with Gemini AI!

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure the FRONTEND_URL in your backend .env file matches your frontend URL exactly |
| Slow responses | Check your internet connection and the Gemini API status |
| "API key not valid" | Verify your GEMINI_API_KEY in the .env file |
| Application not starting | Make sure all dependencies are installed and Node.js is v16+ |

## 🚧 Future Improvements

- 🔐 Add user authentication
- 💾 Implement persistent storage for chat history
- 🖼️ Support for image inputs
- 🎨 Theme customization options
- 📱 Mobile app version

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/NawrizTurjo">Nawriz Turjo</a></p>
  <p>⭐ Star this repository if you found it helpful! ⭐</p>
</div>