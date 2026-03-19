import {Router} from "express"
import {createShelter,getShelters,getShelterById} from "../controllers/shelter.controller.js"
import {authMiddleware} from "../middlewares/auth.js"


const router = Router()
router.post("/createShelter",createShelter)
router.get("/getShelters",getShelters)
router.get("/getShelterById/:id",getShelterById)


export default router

