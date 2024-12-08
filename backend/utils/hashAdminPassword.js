const bcrypt = require("bcrypt");
const saltRounds = 10;

// La contraseña que quieres hashear
const password = "usuarioAdmin";

bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error("Error al hashear la contraseña:", err);
    return;
  }
  console.log("Contraseña hasheada:", hashedPassword);
});
