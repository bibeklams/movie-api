import express from "express";
import protect from "../middleware/protect.js";
import upload from "../middleware/uploadMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";
import {
  getAllMovie,
  addMovie,
  deleteMovie,
  updateMovie,
  getSingleMovie,
} from "../controllers/movieController.js";
const router = express.Router();

router.post("/", protect, adminOnly, upload.single("image"), addMovie);
router.get("/", getAllMovie);
router.get("/:id", getSingleMovie);
router.put("/:id", protect, adminOnly, upload.single("image"), updateMovie);
router.delete("/:id", protect, adminOnly, deleteMovie);

export default router;
