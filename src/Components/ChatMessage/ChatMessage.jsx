import React from "react";
import "./chatsMessage.css";

function ChatMessage({ message, isSelf, profile_pic }) {
  return (
    <div
      className={`chat-message ${isSelf ? "send-message" : "recicved-message"}`}
    >
      <div>
        <img src={profile_pic} className="message-pic" />
        <span className="message">{message}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
