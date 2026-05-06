import {Router} from "express"
import { addReview,getReviewsByPet,getReviewsByShelter,deleteReview } from "../controllers/review.controller.js";
//import authMiddleware from "../middlewares/auth.js"

import {authMiddleware} from "../middlewares/auth.js"


const router = Router()

router.post("/add",authMiddleware, addReview);
router.get("/pet/:petId", getReviewsByPet);
router.get("/shelter/:shelterId", getReviewsByShelter);
router.delete("/:id", authMiddleware, deleteReview);

export default router;