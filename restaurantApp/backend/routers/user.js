import { registerUser, loginUser, getUserProfile} from "../controllers/user.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
export default router;