const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { adminAuthMiddleware, checkAdminAuth } = require("./middleware/auth");
const authRoutes = require("./routes/authRoutes");

const app = express();
const HOST = "127.0.0.1";
const PORT = 3000;

// Middleware para evitar la caché en páginas protegidas
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// Middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "5Coment@rios!!",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Para desarrollo, asegurarte de que esta opción esté en `false`
      httpOnly: true,
      sameSite: "lax", // Cambia a `strict` si tienes problemas de sesión
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    },
  })
);

// Routes
app.use("/auth", authRoutes);
app.get("/check-admin-auth", checkAdminAuth);
app.get("/admin", adminAuthMiddleware, (req, res) => {
  res.json({ message: "Acceso de admin confirmado" });
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
