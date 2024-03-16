import { Router } from "express";
import { addMessage, getMessage , addImageMessage, addAudioMessage} from "../controllers/MessageController.js";
import multer from "multer";
 

const router = Router();
const uploadImage = multer({dest : "uploads/images/"});
const uploadAudio = multer({dest : "uploads/recordings"})


router.post("/add-message" , addMessage);
router.get("/get-messages/:from/:to" , getMessage);
router.post("/add-image-message" , uploadImage.single("image"),addImageMessage)
router.post("/add-audio-message" , uploadAudio.single("Audio"),addAudioMessage)
 export  default router;