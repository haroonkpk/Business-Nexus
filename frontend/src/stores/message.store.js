import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./auth.store.js";

export const useMessageStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
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

  subscribeToMessages: (newMessage) => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.from !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
