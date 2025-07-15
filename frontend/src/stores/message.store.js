import { create } from "zustand";
import axiosInstance from "../lib/axios.js";

export const useMessageStore = create((set) => ({
  messages: [],
  loading: false,

  getMessages: async (id1, id2) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/messages/${id1}/${id2}`);
      set({ messages: res.data });
    } catch (err) {
      console.error("Fetch messages error:", err);
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (from, to, text) => {
    try {
      const res = await axiosInstance.post(`/messages`, { from, to, text });
      set((state) => ({
        messages: [...state.messages, res.data],
      }));
    } catch (err) {
      console.error("Send message error:", err);
    }
  },
}));
