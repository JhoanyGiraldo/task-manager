import express from "express";
import {
  crear,
  obtenerTodas,
  eliminar,
} from "../controllers/tareaController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, crear);
router.get("/", verifyToken, obtenerTodas);
router.delete("/:id", verifyToken, eliminar);

export default router;