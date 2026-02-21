import express from "express";
import authMiddleware from "../middleware/auth.js";
import { addReview, getReviewsByMenu, deleteReview } from "../controllers/review.js";
import isAdmin from "../middleware/admin.js";

const router = express.Router();

router.post("/:menuItemId", authMiddleware, addReview);
router.get("/:menuItemId", getReviewsByMenu);
router.delete("/:id", authMiddleware, isAdmin, deleteReview);

export default router;
