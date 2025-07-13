import express from "express";

import { protectedRoute } from "../middleware/auth.middleware.js";
import { createRequest, getRequest, getSentReqStatuses, updateStatus } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/", protectedRoute, createRequest);
router.get("/sent", protectedRoute, getSentReqStatuses);
router.get("/received", protectedRoute, getRequest);
router.put("/:id",protectedRoute, updateStatus)
export default router;
