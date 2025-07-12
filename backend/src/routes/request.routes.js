import express from "express";

import { protectedRoute } from "../middleware/auth.middleware.js";
import { createRequest, getRequest, getSentReqStatuses } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/", protectedRoute, createRequest);
router.get("/sent", protectedRoute, getSentReqStatuses);
router.get("/received", protectedRoute, getRequest);

export default router;
