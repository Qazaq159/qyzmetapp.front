import api from "./api";

export const fetchMyOrders = async () => {
  try {
    const response = await api.get("my-orders").json();
    return response;
  } catch (error) {
    console.error("Orders fetching error:", error);
    throw error;
  }
};

export const fetchCurrentOrder = async () => {
  try {
    const response = await api.get("current-order").json();
    return response;
  } catch (error) {
    console.error("Order fetching error:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post("orders/", {
      body: orderData,
      headers: {
        Accept: "application/json", 
      },
    });
    return await response.json();
  } catch (error) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData;
    }
    console.error("Order creation error:", error);
    throw error;
  }
};

export const rejectOrder = async (orderId) => {
  try {
    const response = await api.post(`orders/${orderId}/reject/`).json();
    return response;
  } catch (error) {
    console.error("Order rejection error:", error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
      await api.delete(`orders/${orderId}/`);
  } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
  }
};

export const fetchOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`my-orders/${orderId}/`).json();
    return response;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.patch(`orders/${orderId}/status/`, {json: { status }}).json();
    return response;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};