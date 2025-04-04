import api from "./api";

export async function fetchUserProfile() {
  try {
    const result = await api.get("user/profile").json();
    return result.data;
  } catch (error) {
    throw new Error(error.message || "Ошибка при получении профиля");
  }
}

export const topUpBalance = async (amount, file) => {
  const formData = new FormData();
  formData.append("amount", amount);
  formData.append("proof", file);
  try {
      const response = await api.post("balance/deposit", {
          body: formData,
      });
      return response;
  } catch (error) {
      const errorData = await error.response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit the request.");
  }
};
