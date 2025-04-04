import api from "./api"; 

export const authService = async (formData, isLogin) => {
  const endpoint = isLogin ? "login" : "register"; 
  try {
    const data = await api.post(endpoint, { json: formData }).json(); 
    if (!isLogin) {
      alert("Вы успешно зарегистрированы! Войдите в аккаунт.");
    } else {
      localStorage.setItem("token", data.access_token);
    }
    return { success: true, data };
  } catch (error) {
    console.log(error);
    if (error.response) {
      const errorData = await error.response.json();
      if (error.response.status === 422) {
        return { success: false, errors: errorData.errors || {} };
      } else {
        return { success: false, message: errorData.message || "Ошибка" };
      }
    }
    return { success: false, message: "Ошибка сети" };
  }
};