import {Router} from "express"
import { checkUser, getAllUsers, onboardingUser } from "../controllers/AuthController.js";

const router = Router();

router.route("/login").post(checkUser)
router.route("/onboarding").post(onboardingUser)
router.route("/get-contacts").get(getAllUsers)


export default router