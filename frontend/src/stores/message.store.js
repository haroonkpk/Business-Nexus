import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useMessageStore = create((set) => ({
  messages: [],
  loading: false,

  getMessages: async (id) => {
    set({ loading: true });
    set({ messages: [] });
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data });
    } catch (err) {
      console.error("Fetch messages error:", err);
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (to, text) => {
    try {
      const res = await axiosInstance.post(`/message`, { to, text });
      set((state) => ({
        messages: [...state.messages, res.data],
      }));
    } catch (err) {
      console.error("Send message error:", err);
    }
  },
}));
