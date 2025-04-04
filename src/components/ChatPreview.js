import React from "react";

const ChatPreview = ({ chat, onClick }) => {
  return (
    <li key={chat.id} className="chat-item" onClick={() => onClick(chat)}>
    <div className="chat-info">
        <h3 className="chat-participant">
        {chat.participant.name} <span className="chat-role"></span>
        </h3>
        <span className="chat-time">{chat.message?.created_at || ""}</span>
    </div>
    <div className="chat-meta">
        <p className="chat-info-title">{chat.title}</p>
        <span className={`chat-status ${chat.status.toLowerCase().replace(" ", "-")}`}>
        {chat.status}
        </span>
    </div>
    <div className="chat-row">
        <p className="last-message">{chat.message.message}</p>
        {chat.unread_count > 0 && (
        <span className="chat-unread">{chat.unread_count} new</span>
        )}
    </div>
    </li>
  );
};

export default ChatPreview;
