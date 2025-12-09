import axios from "axios";

const api = axios.create({
  baseURL: "https://readjourney.b.goit.study/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};

export default api;
