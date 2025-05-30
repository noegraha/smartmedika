import axios from "axios";

// Base URL untuk berbagai API
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const reportBaseUrl = process.env.REACT_APP_API_BASE_URL_REPORT;

const apiInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Menambahkan interceptor untuk menambahkan Authorization token
apiInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari sessionStorage jika ada
    const token = sessionStorage.getItem("userData");

    if (token) {
      // Jika token ada, tambahkan ke header Authorization
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Menangani error request jika ada
    return Promise.reject(error);
  }
);

const authInstance = axios.create({
  baseURL: reportBaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiInstance, authInstance };
