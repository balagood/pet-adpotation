import {Router} from "express"
//import upload from "../middlewares/upload.js";
import { addPet, getPets,getPetById, updatePet,deletePet,upload} from "../controllers/pet.controller.js"
import {authMiddleware} from "../middlewares/auth.js"

const router = Router()

router.post('/addPet',upload.array("image",5),addPet)
router.get('/getPets',getPets)
router.get('/getPetsById/:id',getPetById)
router.put('/updatePets/:id',updatePet)
router.delete('/deletePets/:id',authMiddleware,deletePet)

export default router