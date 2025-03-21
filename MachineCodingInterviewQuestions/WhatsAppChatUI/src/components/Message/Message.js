import React from "react";
import { Check, CheckCheck } from "lucide-react";
import { formatTime } from "../../utils/timeUtils";
import "./Message.css";

const Message = ({ text, sender, timestamp, status }) => {
  const getStatusIcon = () => {
    if (status === "sent") return <Check className="status-icon sent" />;
    if (status === "delivered")
      return <CheckCheck className="status-icon delivered" />;
    if (status === "read") return <CheckCheck className="status-icon read" />;
  };

  return (
    <div className={`message-container ${sender === "user" ? "user" : "bot"}`}>
      <div className="message">
        {text}
        <div className="message-info">
          <span className="timestamp">{formatTime(timestamp)}</span>
          {sender === "user" && getStatusIcon()}
        </div>
      </div>
    </div>
  );
};

export default Message;
