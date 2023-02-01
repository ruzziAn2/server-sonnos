import { Router } from "express";
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  updateClient,
} from "../controllers/client.controller.js";
import { requireToken } from "../middlewares/requireAuth.js";

const router = Router();

router.get("/:id/clients", requireToken, getClients);
router.get("/:id/clients/:id", requireToken, getClient);
router.post("/:id/clients/", requireToken, createClient);
router.patch("/:id/clients/:id", requireToken, updateClient);
router.delete("/:id/clients/:id", requireToken, deleteClient);

export default router;
