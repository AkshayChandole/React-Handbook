import React from "react";
import "./ChatList.css";
import { formatTime } from "../../utils/timeUtils.js";

const ChatList = ({ onSelectChat, chats }) => {
  return (
    <div className="chat-list">
      <h2>WhatsApp</h2>
      {chats.map((chat) => {
        const lastMessage =
          chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1]
            : null;

        return (
          <div
            key={chat.id}
            className="chat-item"
            onClick={() => onSelectChat(chat)}
          >
            <div className="chat-info">
              <h4>{chat.name}</h4>
              <p>{lastMessage ? lastMessage.text : "No messages yet"}</p>
            </div>
            <span className="chat-time">
              {lastMessage ? formatTime(lastMessage.timestamp) : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
