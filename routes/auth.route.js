import { Router } from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/auth.controller.js";
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

export default router;
