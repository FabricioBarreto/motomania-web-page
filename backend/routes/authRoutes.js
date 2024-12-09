const express = require("express");
const UserService = require("../services/userService");
const router = express.Router();

// Ruta de login para admin (ya existente)
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

    console.log("Credenciales de admin inválidas");
    res.status(401).json({ error: "Credenciales inválidas" });
  } catch (error) {
    console.error("Error en el login de admin:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Nueva ruta de login para usuarios regulares
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.authenticateUser(email, password);

    if (user) {
      console.log("Usuario autenticado:", user.email);
      req.session.userId = user.id;
      req.session.userName = user.name;
      return res.status(200).json({
        name: user.name,
        points: user.points,
      });
    }

    console.log("Credenciales de usuario inválidas");
    res.status(401).json({ error: "Correo o contraseña incorrectos" });
  } catch (error) {
    console.error("Error en el login de usuario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Nueva ruta de registro para usuarios regulares
router.post("/user/register", async (req, res) => {
  try {
    const newUser = await UserService.registerUser(req.body);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: newUser,
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    if (error.message === "El correo electrónico ya está registrado") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al registrar el usuario" });
    }
  }
});

// Ruta de logout (ya existente)
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
