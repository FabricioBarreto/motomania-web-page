const fs = require("fs");
const path = require("path");

class Database {
  static loadUsers() {
    const filePath = path.join(__dirname, "..", "usersDB.json");
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  }

  // Nuevo método para guardar usuarios
  static saveUsers(users) {
    const filePath = path.join(__dirname, "..", "usersDB.json");
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }
}

module.exports = Database;
