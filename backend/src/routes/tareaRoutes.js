import express from "express";
import {
  crear,
  obtenerTodas,
  eliminar,
  actualizar,
} from "../controllers/tareaController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, crear);
router.get("/", verifyToken, obtenerTodas);
router.delete("/:id", verifyToken, eliminar);
router.put("/:id", verifyToken, actualizar);

export default router;
