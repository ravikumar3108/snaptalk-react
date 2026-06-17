import axios from "axios";

// const API_URL = "http://localhost:8000/";
const API_URL = "https://snaptalk-back.vercel.app/";
function getToken() {
  return localStorage.getItem("token");
}

let Api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

// Interceptor ensure karta hai ki har request mein latest token jaye
Api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default Api;
