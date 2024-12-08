function adminAuthMiddleware(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  console.log("Usuario no autorizado o sesión no válida");
  res.status(401).json({ error: "No autorizado" });
}

function checkAdminAuth(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return res.status(200).json({ message: "Autenticado como administrador" });
  }
  res.status(401).json({ error: "No autorizado" });
}

module.exports = {
  adminAuthMiddleware,
  checkAdminAuth,
};
