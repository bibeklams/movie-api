import express from "express";
import protect from "../middleware/protect.js";
import {
  bookMovie,
  getMyBookings,
  cancelbooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/:id", protect, bookMovie);
router.get("/", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelbooking);

export default router;
