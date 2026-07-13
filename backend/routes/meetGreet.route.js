import express from "express";
import {
  createMeetRequest,
  getAdopterRequests,
  getShelterRequests,
  getAvailableSlots,
  updateMeetStatus,
} from "../controllers/meetGreetController.js";

import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/",authMiddleware, createMeetRequest);
router.get("/adopter", authMiddleware,getAdopterRequests);
router.get("/shelter", authMiddleware,getShelterRequests);
router.get( "/slots/:shelterId", authMiddleware, getAvailableSlots );
router.put("/:id",authMiddleware, updateMeetStatus);

export default router;