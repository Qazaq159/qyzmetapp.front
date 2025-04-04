import ky from "ky";

const api = ky.create({
  prefixUrl: `${process.env.REACT_APP_API_BASE_URL}/api`,
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export default api;
