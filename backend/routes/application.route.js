import {Router} from "express"
import { submitApplication,getApplicationsByUser,getApplicationsByShelter,updateApplicationStatus,deleteApplication } from "../controllers/application.controller.js"
import {authMiddleware,shelterMiddleware} from "../middlewares/auth.js"

const router = Router();

router.post("/submitApplication",authMiddleware,submitApplication);
router.get("/user", authMiddleware,getApplicationsByUser);
router.get("/shelter",authMiddleware,shelterMiddleware, getApplicationsByShelter);
router.put("/:id", authMiddleware,shelterMiddleware,updateApplicationStatus);
router.delete("/:id", authMiddleware, deleteApplication);

export default router;
