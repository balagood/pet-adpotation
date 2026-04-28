import {Router} from "express"
//import upload from "../middlewares/upload.js";
import { addPet, getPets,getPetById, updatePet,deletePet,upload,getMyPets} from "../controllers/pet.controller.js"
import {authMiddleware,shelterMiddleware} from "../middlewares/auth.js"

const router = Router()

router.post('/addPet',authMiddleware,shelterMiddleware,upload.array("image",5),addPet)
router.get('/getPets',getPets)
router.get("/myPets", authMiddleware,shelterMiddleware, getMyPets);
router.get('/getPetsById/:id',getPetById)
router.put('/updatePets/:id',authMiddleware,shelterMiddleware,upload.array("image",5),updatePet)
router.delete('/deletePets/:id',authMiddleware,shelterMiddleware,deletePet)

export default router