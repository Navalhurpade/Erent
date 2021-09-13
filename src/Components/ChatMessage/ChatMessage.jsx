import React from "react";

function ChatMessage({ message, isSelf }) {
  return (
    <div
      className={`chat-message ${isSelf ? "send-message" : "recicved-message"}`}
    >
      <span>{message}</span>
    </div>
  );
}

export default ChatMessage;
