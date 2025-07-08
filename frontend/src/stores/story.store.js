import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useStoryStore = create((set) => ({
  // ===========States===========
  storyTypes: [],
  selectedTypes: null,
  stories: [],
  AllStories: [],
  AllEpisodes: [],
  episodes: null,
  favorites: [],
  episode: {},
  loading: false,
  loadingForIcon:false,

  // ============funForStates=========
  getStoryTypes: async () => {
    try {
      const res = await axiosInstance.get("/story/getStoryTypes");
      set({ storyTypes: res.data.allStoryTypes });
    } catch (error) {
      console.log("error in get storytypes");
    }
  },
  getStoriesByTypeId: async (typeId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/story/stories/${typeId}`);
      set({ stories: res.data.stories });
    } catch (error) {
      set({ stories: [] });
      console.log("error in get story", error);
    } finally {
      set({ loading: false });
    }
  },
  getAllStories: async () => {
    try {
      const res = await axiosInstance.get("/story/stories");
      set({ AllStories: res.data.stories });
    } catch (error) {
      console.log("error in get story", error);
    }
  },
  getAllEpisodes: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/story/episodes");
      console.log(res.data.episodes);

      set({ AllEpisodes: res.data.episodes });
    } catch (error) {
      console.log("error in get Ep", error);
    } finally {
      set({ loading: false });
    }
  },
  getEpisodesByStoryId: async (storyID) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/story/episodes/${storyID}`);
      set({ episodes: res.data.episodes });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.message);
    }
  },
  getEpisodeById: async (episodeId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/story/episode/${episodeId}`);
      set({ episode: res.data.episode });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  getAddToFavotrites: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/favorites/");
      set({ favorites: res.data.favorites });
    } catch (error) {
      console.log("error in get story", error);
    } finally {
      set({ loading: false });
    }
  },

  // =============FunForCreation===========

  createCategory: async (formData) => {
    try {
      const res = await axiosInstance.post("/story/storyTypes", formData);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  },
  createStoryByCategoryId: async (formData, typeId) => {
    try {
      await axiosInstance.post(`/story/story/${typeId}`, formData);
      toast.success("story Creted");
    } catch (error) {
      toast.error(error.message);
    }
  },
  createEpisodeByStoryId: async (formData, storyId) => {
    try {
      await axiosInstance.post(`/story/episode/${storyId}`, formData);
      toast.success("Episode Creted");
    } catch (error) {
      toast.error(error.message);
    }
  },

  addToFavorites: async (storyId) => {
    set({ loadingForIcon: true });
    try {
      const res = await axiosInstance.post(`/favorites/${storyId}`);
      // Refresh favorites list from server after successful add
      const response = await axiosInstance.get("/favorites/");
      set({ favorites: response.data.favorites });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }finally{
      set({ loadingForIcon: false });

    }
  },

  // =========funForDeletion==========
  deleteCategory: async (storyTypeId) => {
    try {
      const res = await axiosInstance.delete(
        `/story/deleteStoryType/${storyTypeId}`
      );
      toast.success("Type deleted");
    } catch (error) {
      toast.error(error.message);
    }
  },
  deleteStoryById: async (storyId) => {
    try {
      const res = await axiosInstance.delete(`/story/deleteStory/${storyId}`);
      toast.success("story deleted");
    } catch (error) {
      toast.error(error.message);
    }
  },
  deleteEpisodeById: async (episodeId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/story/deleteEpisode/${episodeId}`);
      toast.success("episode deleted");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  removeFavorite: async (storyId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.delete("/favorites/", {
        data: { storyId },
      });
      // Refresh favorites list from server after successful add
      const response = await axiosInstance.get("/favorites/");
      set({ favorites: response.data.favorites });

      toast.success("itm removed");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
