import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchChatMessages, sendMessage, markChatAsRead } from "../services/chatService";
import "../styles/ChatPage.css";
import Layout from "../components/Layout";
import { Send, Loader2 } from "lucide-react"; 
import LoadingPage from "../components/LoadingPage";

const ChatPage = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const [chatData, setChatData] = useState(location.state?.chatData || null);
  const [messages, setMessages] = useState(chatData?.messages || []);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(!chatData);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatData) {
        const loadMessages = async () => {
          setIsLoading(true);
          try {
            const data = await fetchChatMessages(chatId);
            setChatData(data);
            setMessages(data.messages);
            await markChatAsRead(chatId);
          } catch (error) {
            console.error("Failed to fetch messages:", error);
          } finally {
            setIsLoading(false);
          }
        };
        loadMessages();
      } else {
        markChatAsRead(chatId);
      }
      const socketConnection = new WebSocket(`ws://localhost:8000/ws/chat/${chatId}/`);
      socketConnection.onopen = () => {
        console.log("WebSocket connection established.");
      };
      socketConnection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data.message,
            user_id: data.user_id,
            created_at: data.created_at,
          },
        ]);
      };
      socketConnection.onclose = () => {
        console.log("WebSocket connection closed.");
      };
      setSocket(socketConnection);
      return () => {
        socketConnection.close();
      };  
    }, [chatId, chatData]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);  
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setIsSending(true);
    try {
      const response = await sendMessage(chatId, newMessage);
      setChatData(response);
      setMessages(response.messages);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) return <LoadingPage />;
  return (
    <Layout>
    <div className="chat-page">
    <div className="chat-container">
      <h2 className="chat-title">Chat with {chatData?.participant?.name || "..."}</h2>
      <h3 className="chat-subtitle">Order: {chatData?.title || "Order details"}</h3>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.user_id === chatData?.participant?.id ? "other-message" : "my-message"}`}>
            <p>{msg.message}</p>
            <small className="message-time">{msg.created_at}</small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isSending}
        />
        <button onClick={handleSendMessage} disabled={isSending || newMessage.trim() === ""}>
            {isSending ? <Loader2 size={25} color="#fff" className="loading-spinner" /> : <Send size={25} color="#fff" />}
        </button>
      </div>
    </div>
    </div>
    </Layout>
  );
};
export default ChatPage;
