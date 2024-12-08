const express = require("express");
const router = express.Router();
const { adminAuthMiddleware } = require("../middleware/auth");

router.get("/beneficios", adminAuthMiddleware, (req, res) => {
  // Lógica para retornar beneficios
  res.json({ beneficios: [] });
});

router.post("/beneficios", adminAuthMiddleware, (req, res) => {
  // Lógica para agregar un beneficio
  res.status(201).json({ message: "Beneficio agregado" });
});

module.exports = router;
