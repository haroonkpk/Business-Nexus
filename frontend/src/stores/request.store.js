import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useRequestStore = create((set) => ({
  requests: [],
  ReceivedRequests: [],
  loading: false,

  // ==============get requests=================

  getReceivedReq: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/request/received");
      console.log(res.data);
      set({ ReceivedRequests: res.data });
    } catch (error) {
      toast.error("faild req fetching");
    }
  },

  getSnetRequests: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/request/sent");
      set({ requests: res.data });
    } catch (error) {
      toast.error("Error fetching requests");
    } finally {
      set({ loading: false });
    }
  },

  // ============== create request=================
  createRequest: async (toProfileId) => {
    console.log(toProfileId);

    set({ loading: true });
    try {
      const res = await axiosInstance.post("/request", { toProfileId });
      toast.success("Request sent successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.msg || "Request failed");
    } finally {
      set({ loading: false });
    }
  },
}));
