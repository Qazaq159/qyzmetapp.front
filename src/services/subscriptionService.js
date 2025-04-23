import api from "./api"; 

export const getSubscriptionTypes = async () => {
    try {
      const data = await api.get("subscriptions/types").json();
      return data;
    } catch (error) {
      console.error("Error fetching subscription types:", error);
      throw error;
    }
};  

export const purchaseSubscription = async (subscriptionTypeId) => {
  try {
      const response = await api.post(`subscriptions/${subscriptionTypeId}/subscribe/`).json();
      return response;
  } catch (error) {
      console.error("Error purchasing subscription:", error);
      throw error;
  }
};