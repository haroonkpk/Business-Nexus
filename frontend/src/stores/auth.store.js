import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  Entrepreneurs: null,
  isCheckingAuth: true,
  isSignuping: false,
  isLogining: false,
  isLogouting: false,
  Loading: false,
  onlineUsers: [],
  socket: null,

  checkingAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      localStorage.setItem("authUser", JSON.stringify(res.data));
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("user not logedin");
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  getUserById: async (userId) => {
    set({ Loading: true });
    try {
      const res = await axiosInstance.get(`/getuser/${userId}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ Loading: false });
    }
  },
  getEntrepreneurs: async () => {
    set({ Loading: true });
    try {
      const res = await axiosInstance.get("/auth/entrepreneurs");
      set({ Entrepreneurs: res.data });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ Loading: false });
    }
  },
  UserSignUp: async (formData) => {
    try {
      set({ isSignuping: true });
      const res = await axiosInstance.post("/auth/signup", formData);
      localStorage.setItem("authUser", JSON.stringify(res.data));
      set({ authUser: res.data });
      toast.success("Sign up successful!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error signing up:", error);
    } finally {
      set({ isSignuping: false });
    }
  },
  UserLogin: async (formData) => {
    set({ isLogining: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));

      toast.success("Login successful!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLogining: false });
    }
  },
  LogOut: () => {
    set({ isLogouting: true });
    try {
      axiosInstance.post("/auth/logout");
      localStorage.removeItem("authUser");
      set({ authUser: null });
      toast.success("Logout successful!");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      set({ isLogouting: false });
    }
  },

  // sockeio
  connectSocket: () => {
    
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser.userId,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
