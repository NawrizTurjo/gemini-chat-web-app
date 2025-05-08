const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const FRONTEND_URL = "https://gemini-chat-web-app-frontend.onrender.com";
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());

// Configure API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post("/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    //   console.log("Request received:", { message, historyLength: history.length });

    // Create a new chat for each request - don't rely on history in the API
    const chat = model.startChat();

    // First, replay the conversation history to build context
    for (let i = 0; i < history.length - 1; i++) {
      const msg = history[i];
      if (msg.role === "user") {
        await chat.sendMessage(msg.content);
      }
    }

    // Now send the latest message
    const result = await chat.sendMessage(message);

    // Extract the response text
    let responseText;
    try {
      responseText = result.response.text();
    } catch (err) {
      console.log("Error with text() method, trying as property", err);
      responseText = result.response.text;
    }

    if (!responseText) {
      console.log("Response object:", JSON.stringify(result.response));
      responseText = "Sorry, I couldn't generate a response. Please try again.";
    }

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
