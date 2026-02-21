import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createReservation,
  getMyReservations,
  updateReservation,
} from "../controllers/reservation.js";

const router = express.Router();

router.post("/", authMiddleware, createReservation);
router.get("/my", authMiddleware, getMyReservations);
router.put("/:id", authMiddleware, updateReservation);

export default router;
