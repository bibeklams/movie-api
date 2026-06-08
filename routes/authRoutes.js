import express from "express";
import protect from "../middleware/protect.js";
import {
  register,
  login,
  getProfile,
  logout,
  refreshToken,
  changeProfile,
  changePassword,
  forgetPassword,
  resetPassword,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, getProfile);

router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

router.put("/change-profile", protect, changeProfile);
router.put("/change-password", protect, changePassword);

router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
