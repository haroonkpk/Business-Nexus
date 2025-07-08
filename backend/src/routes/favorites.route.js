import express from "express";
const router = express.Router();
import {
  addToFavorites,
  deleteFavorites,
  getFavorites,
} from "../controllers/favorites.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

router.post("/:storyId", protectedRoute, addToFavorites);
router.get("/", protectedRoute, getFavorites);
router.delete("/", protectedRoute, deleteFavorites);

export default router;
