import { Router } from "express";
import {
  addFosterUpdate,
  getFosterUpdates,
  updateFosterUpdate,
  deleteFosterUpdate,
  upload,
} from "../controllers/fosterUpdate.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware,upload.fields([{name: "photos",maxCount: 5,},]), addFosterUpdate);
//router.get("/:petId", authMiddleware, getFosterUpdates);
router.get("/:fosterId", authMiddleware, getFosterUpdates);
router.put("/:id", authMiddleware, updateFosterUpdate);
router.delete("/:id", authMiddleware, deleteFosterUpdate);

export default router;