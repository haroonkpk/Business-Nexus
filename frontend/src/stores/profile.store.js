import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useProfileStore = create((set) => ({
  loading: false,
  profile: JSON.parse(localStorage.getItem("profile")) || null,
  entrepreneurProfiles:
    JSON.parse(localStorage.getItem("entrepreneurProfiles")) || null,

  getProfile: async (userId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/profile/${userId}`);
      set({ profile: res.data });
      localStorage.setItem("profile", JSON.stringify(res.data));
    } catch (error) {
      if (err.response?.status === 404) {
        set({ profile: "notfound" });
      } else {
        toast.error("Error fetching profile");
        set({ profile: null });
      }
    } finally {
      set({ loading: false });
    }
  },

  getentrepreneurProfiles: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/profile/");
      console.log(res.data);
      set({ entrepreneurProfiles: res.data });
      localStorage.setItem("entrepreneurProfiles", JSON.stringify(res.data));
    } catch (error) {
      toast.error("Error fetching profiles");
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (formData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put("/profile", formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
