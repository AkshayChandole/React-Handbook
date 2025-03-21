import React, { useState, useEffect } from "react";
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";
import "./ChatWindow.css";

const ChatWindow = ({ chat, onBack }) => {
  const [messages, setMessages] = useState(chat.messages || []);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages(chat.messages || []);
  }, [chat]);

  const handleSubmitMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);

    // ************************************
    // Below code is just for simulating automatic reply from other user
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 2000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, status: "read" } : msg
        )
      );
      setIsTyping(true);
    }, 4000);

    setTimeout(() => {
      setIsTyping(false);
      const botReply = {
        text:
          chat.name === "Bhushan"
            ? "That sounds cool! 🙌"
            : `Perfect! Let's catch up over some good food. 😃`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "read",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 6000);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button
          onClick={() => onBack({ ...chat, messages })}
          className="back-button"
        >
          ←
        </button>
        <h3>{chat.name}</h3>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            sender={msg.sender}
            timestamp={msg.timestamp}
            status={msg.status}
          />
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSubmitMessage} />
    </div>
  );
};

export default ChatWindow;
