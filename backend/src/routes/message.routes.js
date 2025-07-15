import express from "express";
import { protectedRoute } from "../middleware/auth.middleware";
import { getMessages, sendMessage } from "../controllers/messages.controller";

const router = express.Router();

router.get("/:id1/:id2", protectedRoute, getMessages);
router.post("/message", protectedRoute, sendMessage);

export default router;
