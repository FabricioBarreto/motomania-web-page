const express = require("express");
const UserService = require("../services/userService");
const router = express.Router();

// Ruta de login para administradores
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminUser = await UserService.authenticateAdmin(username, password);

    if (adminUser) {
      console.log("Usuario admin autenticado:", adminUser.username);
      req.session.isAdmin = true;
      req.session.adminName = adminUser.username;
      return res.status(200).json({ message: "Login exitoso" });
    }

    res.status(401).json({ error: "Credenciales inválidas" });
  } catch (error) {
    console.error("Error en el login de admin:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta de login para usuarios (email o DNI)
router.post("/user/login", async (req, res) => {
  const { identifier, password } = req.body; // identifier puede ser email o DNI

  try {
    const user = await UserService.authenticateUser(identifier, password);

    if (user) {
      console.log("Usuario autenticado:", user.email || user.dni);
      req.session.userId = user.id;
      req.session.userName = user.name;
      return res.status(200).json({
        name: user.name,
        points: user.points,
      });
    }

    res.status(401).json({ error: "Identificador o contraseña incorrectos" });
  } catch (error) {
    console.error("Error en el login de usuario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta de registro para usuarios
router.post("/user/register", async (req, res) => {
  try {
    const newUser = await UserService.registerUser(req.body);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: newUser,
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    if (
      error.message === "El correo electrónico o el DNI ya están registrados"
    ) {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al registrar el usuario" });
    }
  }
});

// Ruta de logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Sesión cerrada" });
  });
});

module.exports = router;
