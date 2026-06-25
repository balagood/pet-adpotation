import { Router } from "express";
import {createShelterReview,getShelterReviews} from "../controllers/shelterReview.controller.js";
import {authMiddleware} from "../middlewares/auth.js"


const router = Router();

/**
 * ADD SHELTER REVIEW
 */
router.post("/", createShelterReview);

/**
 * GET REVIEWS BY SHELTER ID
 */
router.get("/:shelterId", getShelterReviews);

export default router;