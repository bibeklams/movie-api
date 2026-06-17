import express from "express";
import {
  getAllBookings,
  getAllUsers,
  getSingleUser,
  getSingleBooking,
  adminDashboard,
} from "../controllers/adminController.js";
import protect from "../middleware/protect.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);

router.get("/users/:id", protect, adminOnly, getSingleUser);

router.get("/bookings", protect, adminOnly, getAllBookings);

router.get("/bookings/:id", protect, adminOnly, getSingleBooking);
router.get("/dashboard", protect, adminOnly, adminDashboard);
export default router;
