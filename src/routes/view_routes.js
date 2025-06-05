import express from "express";
import {
  updateUser,
  deleteUser,
  createSensor,
  updateSensor,
  deleteSensor,
  createReading,
  deleteReading,
  updateReading,
  getUserView,
} from "../controllers/view_controller.js";

const router = express.Router();

router.put("/update_reading/:userId/:sensorId/:readingId", updateReading);
router.get("/get_user_view/:userId", getUserView);

export default router;
