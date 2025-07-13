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
      set({ ReceivedRequests: res.data });
    } catch (error) {
      toast.error("faild req fetching");
    }finally{
      set({loading:false})
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

  // ======== update ============

  updateStatus: async (id, updatedStatus) => {
    set({ loading: true });
    
    try {
      await axiosInstance.put(`/request/${id}`, {updatedStatus:updatedStatus});
      toast.success(`requst${updatedStatus}`);
    } catch (error) {
      toast.error("try Again");
    }finally{
      set({loading:false})
    }
  },
}));
