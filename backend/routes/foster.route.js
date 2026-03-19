import {Router} from "express"
import { createFoster, getFostersByUser,getFostersByShelter,updateFoster,endFoster } from "../controllers/foster.controller.js"
import {authMiddleware} from "../middlewares/auth.js"

const router = Router()

router.post("/", authMiddleware, createFoster);

// Get fosters by user
router.get("/user/:userId", authMiddleware, getFostersByUser);

// Get fosters by shelter (optional if shelterId is included in schema)
router.get("/shelter/:shelterId", authMiddleware, getFostersByShelter);

// Update foster record
router.put("/:id", authMiddleware,updateFoster);

// End foster
router.put("/:id/end", authMiddleware,endFoster);

export default router;
