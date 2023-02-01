import { Router } from "express";
import { requireToken } from "../middlewares/requireAuth.js";
import {
  createGym,
  deleteGym,
  getGym,
  getGyms,
  updateGym,
} from "../controllers/gym.controller.js";
const router = Router();

// GET          /api/v1/gyms             all gyms
// GET          /api/v1/gyms/:id         single gym
//POST          /api/v1/gyms             create gym
//PATCH/PUT     /api/v1/gyms/:id         update gym
//DELETE        /api/v1/gyms/:id         delete gym

//chequear si para obtener todos los gimnasios es tan imprescindible que se necesite el Token, consultar a Jero
router.get("/:id", requireToken, getGym);
router.get("/", requireToken, getGyms);
router.post("/", requireToken, createGym);
router.patch("/:id", requireToken, updateGym);
router.delete("/:id", requireToken, deleteGym);

export default router;
