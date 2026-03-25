import express from "express";
import { login, register } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Bienvenido al dashboard ",
    user: req.user
  });
});

export default router;