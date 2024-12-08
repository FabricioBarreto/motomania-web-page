const express = require("express");
const UserService = require("../services/userService");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminUser = await UserService.authenticateAdmin(username, password);

    if (adminUser) {
      console.log("Usuario autenticado:", adminUser.username);
      req.session.isAdmin = true;
      req.session.adminName = adminUser.username;
      return res.status(200).json({ message: "Login exitoso" });
    }

    console.log("Credenciales inválidas");
    res.status(401).json({ error: "Credenciales inválidas" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
    res.clearCookie("connect.sid"); // Borra la cookie de sesión
    res.status(200).json({ message: "Sesión cerrada" });
  });
});

module.exports = router;
