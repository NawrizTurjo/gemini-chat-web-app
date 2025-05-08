import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]); // Message display state
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]); // History state to manage entire conversation flow
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending message
  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message to message display
    const userMessage = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Add user message to history
    const updatedHistory = [...history, { role: "user", content: inputText }];

    try {
      // Call API - send the current complete conversation history
      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputText,
          history: updatedHistory, // Send entire conversation history
        }),
      });

      const data = await response.json();
      const botMessage = { role: "assistant", content: data.response };

      // Add bot response to message display
      setMessages((prev) => [...prev, botMessage]);

      // Update the conversation history
      setHistory(updatedHistory.concat(botMessage)); // Append bot response to history
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard shortcut (Ctrl+Enter)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI Companion</h1>
      </header>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "user-message" : "bot-message"
              }`}
            >
              <div className="message-header">
                {message.role === "user" ? "You" : "AI Assistant"}
              </div>
              <div className="message-content">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="loading-indicator">AI is thinking...</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="input-container">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          rows={4}
        />
        <button onClick={handleSend} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
