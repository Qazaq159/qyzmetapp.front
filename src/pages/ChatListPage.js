import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserChats } from "../services/chatService";
import "../styles/ChatListPage.css";
import Layout from "../components/Layout";
import LoadingPage from "../components/LoadingPage";
import ChatPreview from "../components/ChatPreview";

const ChatListPage = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchUserChats();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, []);
  const handleChatClick = (chat) => {
    navigate(`/chats/${chat.id}`);
  };

  if (loading) return <LoadingPage />;
  return (
    <Layout>
      <div className="chat-list-page">
      <div className="chat-list-container">
      <h2 className="chat-list-title">My Chats</h2>
      <ul className="chat-list">
        {chats.map((chat) => (
            <ChatPreview key={chat.id} chat={chat} onClick={handleChatClick} />
        ))}
      </ul>
      </div>
      </div>
    </Layout>
  );
};
export default ChatListPage;
