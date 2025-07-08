import express from "express";
import {
  deleteEpisode,
  deleteStory,
  deleteStoryType,
  episodes,
  getAllEpisodes,
  getAllStories,
  getEpisodeById,
  getEpisodes,
  getStories,
  getStoryTypes,
  story,
  storyTypes,
} from "../controllers/story.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

// get type, story and episode
router.get("/getStoryTypes", getStoryTypes);
router.get("/stories/:typeId", getStories);
router.get("/stories", getAllStories);
router.get("/episodes/:storyId", getEpisodes);
router.get("/episode/:episodeId", getEpisodeById);
router.get("/episodes", getAllEpisodes);

// create type, story and
router.post("/storyTypes", protectedRoute, storyTypes);
router.post("/story/:typeId", protectedRoute, story);
router.post("/episode/:storyId", protectedRoute, episodes);

//deleete routes
router.delete("/deleteStoryType/:id", protectedRoute, deleteStoryType);
router.delete("/deleteStory/:id", protectedRoute, deleteStory);
router.delete("/deleteEpisode/:id", protectedRoute, deleteEpisode);
export default router;
