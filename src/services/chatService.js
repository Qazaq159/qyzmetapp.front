import api from "./api";

export const sendResponse = async (orderId, message) => {
    try {
      const response = await api
        .post(`chats/${orderId}/messages`, {json: { message }}).json();
      return response;
    } catch (error) {
      console.error("Message sending error:", error);
      throw error;
    }
};  

export const fetchChatMessages = async (chatId) => {
    try {
      const response = await api.get(`chats/${chatId}`).json();
      return response.data;
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      throw error;
    }
};

export const sendMessage = async (chatId, message) => {
    try {
      const response = await api
        .post(`chats/${chatId}/send-message`, {json: { message }}).json();
      return response;
    } catch (error) {
      console.error("Message sending error:", error);
      throw error;
    }
};  

export const markChatAsRead = async (chatId)  => {
    try {
        await api.post(`chats/${chatId}/read`);
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
};

export const fetchUserChats = async () => {
    try {
      const response = await api.get("chats").json();
      return response.data;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
};