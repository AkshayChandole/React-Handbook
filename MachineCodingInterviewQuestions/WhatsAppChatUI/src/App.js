import React, { useEffect, useState } from "react";
import ChatList from "./components/ChatList/ChatList";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import initialChats from "./data/chats.json";
import "./styles.css";

const parseTime = (timeStr) => new Date(`01/01/2000 ${timeStr}`);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState(initialChats);

  // dark theme effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // sort the chats as per latest messages timestamp
  useEffect(() => {
    const sortedChats = [...chats].sort((a, b) => {
      const latestMsgA = a.messages[a.messages.length - 1].timestamp;
      const latestMsgB = b.messages[b.messages.length - 1].timestamp;
      return parseTime(latestMsgB) - parseTime(latestMsgA);
    });

    setChats(sortedChats);
  }, [chats]);

  const handleBackButton = (chat) => {
    const updatedChats = chats.map((c) => (c.id === chat.id ? chat : c));
    setChats(updatedChats);
    setSelectedChat(null);
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞" : "🌙"}
      </button>
      <div className="chat-container">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} onBack={handleBackButton} />
        ) : (
          <ChatList chats={chats} onSelectChat={setSelectedChat} />
        )}
      </div>
    </div>
  );
}

export default App;
