import { useState } from "react";
import { sendResponse } from "../services/chatService";
import "../styles/MessageClientModal.css";
import { useNavigate } from "react-router-dom"; 

const MessageClientModal = ({ orderId, onClose }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const handleSend = async () => {
    if (!message.trim()) return;
    setIsSending(true);
    try {
        const response = await sendResponse(orderId, message);
        const chatData = response;
        navigate(`/chats/${chatData.id}`, { state: { chatData } });
    } catch (error) {
        console.error("Error sending message:", error);
    } finally {
        setIsSending(false);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="message-modal">
        <div className="message-modal-header">
          <h2>Send a message to the client</h2>
          <button className="mes-close-btn" onClick={onClose}>×</button>
        </div>
        <p className="message-modal-description">
          Introduce yourself and ask any questions you have about the order.
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hello! I'm interested in your project. Could you provide more details about..."
          className="message-textarea"
        />
        <div className="mes-modal-actions">
          <button className="mes-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="send-btn" onClick={handleSend}   disabled={isSending || message.trim() === ""}>
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageClientModal;
