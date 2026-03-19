import {Router} from "express"
import { createAppointment,getAppointmentsByUser,getAppointmentsByShelter,updateAppointment,deleteAppointment } from "../controllers/appointment.controller.js"
import {authMiddleware} from "../middlewares/auth.js"


const router = Router()

router.post("/", authMiddleware, createAppointment);
router.get("/user/:userId", authMiddleware, getAppointmentsByUser);
router.get("/shelter/:shelterId", authMiddleware, getAppointmentsByShelter);
router.put("/:id", authMiddleware,updateAppointment);
router.delete("/:id", authMiddleware, deleteAppointment);

export default router;


