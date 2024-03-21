import Router from "express";
import {
  handleRegister,
  loginUser,
  logoutUser,
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(handleRegister);

router.route("/login").post(loginUser);

// secured routes.

router.route("/logout").post(verifyJWT, logoutUser);
export default router;
