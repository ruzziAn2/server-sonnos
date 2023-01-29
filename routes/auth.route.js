import { Router } from "express";
import { body } from "express-validator";
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireAuth.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = Router();

router.post(
  "/register",
  [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Contraseña incorrecta").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  register
);

router.post(
  "/login",
  [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Contraseña incorrecta").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

router.get("/user", requireToken, infoUser);

router.get("refresh", refreshToken);

router.get("/logout", logout);

export default router;
