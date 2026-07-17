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
  updateShelterStatus,
  updateFosterStatus,
  completeFoster,
  getShelters,upload
} from "../controllers/foster.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
// import upload from "../middlewares/upload.js";


const router = Router();
//router.post("/", authMiddleware, createFosterRequest);
router.post("/",authMiddleware,upload.fields([{ name: "photos", maxCount: 10 },{ name: "videos", maxCount: 5 },]),createFosterRequest);
router.get("/my", authMiddleware, getMyFosterPets);
router.get("/shelter", authMiddleware, getShelterFosterPets);
router.put("/shelter/:id", authMiddleware, updateShelterStatus);
router.put("/foster/:id", authMiddleware, updateFosterStatus);
//router.put("/:id", authMiddleware, updateFosterStatus);
router.put("/complete/:id", authMiddleware, completeFoster);
router.get("/shelters", authMiddleware, getShelters);

export default router;