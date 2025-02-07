import React, { useEffect, useRef, useState } from "react";
import ChatBotIcon from "./components/ChatBotIcon";
import "./index.css";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChat, setShowChat] = useState(false); // Toggle state for chat visibility
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=AIzaSyDsyfitx1_JjgMKKZdKYlLkz3lSlmke32g",
        requestOption
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went WRONG!!");
      const apiResponseText =
        data.candidates[0]?.content?.parts?.[0]?.text?.replace(
          /\*\*(.*?)\*\*/g,
          "$1"
        ).trim() || "I didn't understand that.";
      updateHistory(apiResponseText);
    } catch (error) {
      console.error("Error fetching response:", error);
      updateHistory("Oops! Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="container">
      <button className="toggle-chat-btn" onClick={() => setShowChat(!showChat)}>
        {showChat ? <ChatBotIcon /> : <ChatBotIcon />}
      </button>

      {showChat && (
        <div className="chatbot-popup">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-info">
              <ChatBotIcon />
              <h2 className="logo-text">Chatboy</h2>
            </div>
            <button className="close-chat-btn" onClick={() => setShowChat(false)}>
              ✖
            </button>
          </div>

          {/* Chat Body */}
          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatBotIcon />
              <p className="message-text">
                Hey there! <br /> How can I help you today?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Chat Footer */}
          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
