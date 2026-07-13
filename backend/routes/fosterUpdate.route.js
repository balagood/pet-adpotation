import { Router } from "express";
import {
  createFosterUpdate,
  getFosterUpdates,
  updateFosterUpdate,
  deleteFosterUpdate,
} from "../controllers/fosterUpdate.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware, createFosterUpdate);

router.get("/:petId", authMiddleware, getFosterUpdates);

router.put("/:id", authMiddleware, updateFosterUpdate);

router.delete("/:id", authMiddleware, deleteFosterUpdate);

export default router;