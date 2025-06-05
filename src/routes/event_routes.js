import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  createSensor,
  updateSensor,
  deleteSensor,
  createReading,
  deleteReading,
  updateReading,
} from "../services/view_service.js";

const router = express.Router();

const functions = {
  UserCreateView: async (data) => {
    await createUser(data.user_data);
  },
  UserUpdateView: async (data, params) => {
    await updateUser(params.userId, data.user_data);
  },
  UserDeleteView: async (params) => {
    await deleteUser(params.userId);
  },
  SensorCreateView: async (data, params) => {
    await createSensor(params.userId, data.sensor_data);
  },
  SensorUpdateView: async (data, params) => {
    await updateSensor(params.userId, data.sensor_data);
  },
  SensorDeleteView: async (params) => {
    await deleteSensor(params.userId, params.sensorId);
  },
  ReadingCreateView: async (data, params) => {
    await createReading(params.userId, params.sensorId, data.reading_data);
  },
  ReadingUpdateView: async (data, params) => {
    await updateReading(
      params.userId,
      params.sensorId,
      params.readingId,
      data.reading_data
    );
  },
  ReadingDeleteView: async (params) => {
    await deleteReading(params.userId, params.sensorId, params.readingId);
  },
};

router.post("/", (req, res) => {
  const event = req.body;
  if (functions[event.type]) {
    if (event.params && event.data) {
      functions[event.type](event.data, event.params);
    } else if (event.data) {
      functions[event.type](event.data);
    } else if (event.params) {
      functions[event.type](event.params);
    }
  }
  res.end();
});

export default router;
