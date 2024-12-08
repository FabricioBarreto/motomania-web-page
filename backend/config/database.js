const fs = require("fs");
const path = require("path");

// Ruta al archivo usersDB.json
const USERS_DB_PATH = path.join(__dirname, "../usersDB.json");

class Database {
  static loadUsers() {
    if (fs.existsSync(USERS_DB_PATH)) {
      console.log("Ruta del archivo usersDB.json:", USERS_DB_PATH); // Log para depuración
      const data = fs.readFileSync(USERS_DB_PATH, "utf-8");
      return JSON.parse(data);
    }
    console.error("Archivo usersDB.json no encontrado en:", USERS_DB_PATH);
    return [];
  }

  static saveUsers(users) {
    try {
      fs.writeFileSync(USERS_DB_PATH, JSON.stringify(users, null, 2), "utf-8");
      console.log("Usuarios guardados correctamente en usersDB.json");
    } catch (error) {
      console.error("Error al guardar usuarios:", error);
    }
  }
}

module.exports = Database;
