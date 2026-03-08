import express from "express";
import {
  updateUserScore,
  addCompletedTopic,
  getUserStats,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All user routes are protected
router.use(protect);

// Score routes
router.put("/:id/score", updateUserScore);
router.get("/:id/stats", getUserStats);

// Completed topics routes
router.put("/:id/completed-topics", addCompletedTopic);

export default router;
