import axios from 'axios';
 
export const axiosInstance = axios.create({
  baseURL:"/api",
    // import.meta.env.MODE === "development"
    //   ? "http://localhost:5001/api"
    //   : "/api",
  withCredentials: true,
});