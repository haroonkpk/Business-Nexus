import express from "express";

import {
  entrepreneurs,
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", protectedRoute, getProfile); // public profile view
router.get("/", protectedRoute, entrepreneurs); //Allprofiles
router.put("/", protectedRoute, updateProfile); // update own profile

export default router;
