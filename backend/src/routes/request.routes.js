import express from "express";

import { protectedRoute } from "../middleware/auth.middleware.js";
import { createRequest, getSentReqStatuses } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/", protectedRoute, createRequest);
router.get("/sent", protectedRoute, getSentReqStatuses);
// router.put("/", protectedRoute, updateProfile);

export default router;
