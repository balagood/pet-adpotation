import { Router } from "express";
import {addFavorite,getFavorites,removeFavorite,} from "../controllers/favorite.controller.js";

const router = Router();

router.post("/add", addFavorite);
router.get("/:userId", getFavorites);
router.delete("/remove", removeFavorite);

export default router;