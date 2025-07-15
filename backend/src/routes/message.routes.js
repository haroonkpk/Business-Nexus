import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  sendMessage,
} from "../controllers/messages.controller.js";

const router = express.Router();

router.get("/:id", protectedRoute, getMessages);
router.post("/", protectedRoute, sendMessage);

export default router;
