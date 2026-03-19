import {Router} from "express"
import { submitApplication,getApplicationsByUser,getApplicationsByShelter,updateApplicationStatus,deleteApplication } from "../controllers/application.controller.js"
import {authMiddleware} from "../middlewares/auth.js"

const router = Router();

router.post("/submitApplication",authMiddleware,submitApplication);
router.get("/user/:userId", authMiddleware,getApplicationsByUser);
router.get("/shelter/:shelterId",authMiddleware, getApplicationsByShelter);
router.put("/:id", updateApplicationStatus);
router.delete("/:id", authMiddleware, deleteApplication);

export default router;
