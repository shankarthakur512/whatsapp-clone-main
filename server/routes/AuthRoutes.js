import {Router} from "express"
import { checkUser, generateToken, getAllUsers, onboardingUser } from "../controllers/AuthController.js";

const router = Router();

router.route("/login").post(checkUser)
router.route("/onboarding").post(onboardingUser)
router.route("/get-contacts").get(getAllUsers)
router.get("/generate-token/:userId" , generateToken)

export default router