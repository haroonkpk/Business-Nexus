import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  Entrepreneurs:null,
  isCheckingAuth: true,
  isSignuping: false,
  isLogining: false,
  isLogouting: false,
  Loading: false,


  checkingAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      localStorage.setItem("authUser", JSON.stringify(res.data));
      set({ authUser: res.data });
    } catch (error) {
      console.error("error in checkingauth fun", error);
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
  getEntrepreneurs: async ()=>{
    set({Loading:true});
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
      localStorage.setItem("authUser", JSON.stringify(res.data));
      set({ authUser: res.data });
      toast.success("Login successful!");
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
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      set({ isLogouting: false });
    }
  },
}));
