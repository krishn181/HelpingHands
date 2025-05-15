import axios from "axios";

export const API_BASE_URL = 'http://localhost:8080';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor - dynamically add the token to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes
    if (error.response) {
      const status = error.response.status;
      
      // Handle authentication errors
      if (status === 401 || status === 403) {
        console.log("Authentication error - redirecting to login");
        localStorage.removeItem("jwt"); // Clear invalid token
        // Redirect to login page
        // window.location.href = "/login";
      }
      
      // Handle server errors
      if (status === 500) {
        console.error("Server error:", error.response.data);
        alert("Email is used ")
        // You could show a toast notification here
      }
    } else if (error.request) {
      // Network errors - request made but no response
      console.error("Network error - no response received");
    } else {
      // Error in setting up the request
      console.error("Request configuration error:", error.message);
    }
    
    // Pass error along to the component for additional handling
    return Promise.reject(error);
  }
);

// Add this line to export api as the default export
export default api;