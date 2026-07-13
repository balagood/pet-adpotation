/* import {Router} from "express"
import { createFoster, getFostersByUser,getFostersByShelter,updateFoster,endFoster } from "../controllers/foster.controller.js"
import {authMiddleware} from "../middlewares/auth.js"

const router = Router()

router.post("/", authMiddleware, createFoster);
router.get("/user/:userId", authMiddleware, getFostersByUser);
router.get("/shelter/:shelterId", authMiddleware, getFostersByShelter);
router.put("/:id", authMiddleware,updateFoster);
router.put("/:id/end", authMiddleware,endFoster);

export default router;
 */

import { Router } from "express";
import {
  createFosterRequest,
  getMyFosterPets,
  getShelterFosterPets,
  updateFosterStatus,
  completeFoster,
} from "../controllers/foster.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware, createFosterRequest);

router.get("/my", authMiddleware, getMyFosterPets);

router.get("/shelter", authMiddleware, getShelterFosterPets);

router.put("/:id", authMiddleware, updateFosterStatus);

router.put("/complete/:id", authMiddleware, completeFoster);

export default router;