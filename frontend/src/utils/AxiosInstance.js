import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:2000" : "",
  timeout: 10000, // 10 seconds,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
