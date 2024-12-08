const bcrypt = require("bcrypt");
const Database = require("../config/database");

class UserService {
  static async authenticateAdmin(username, password) {
    const users = Database.loadUsers();

    const adminUser = users.find(
      (u) => u.username === username && u.role === "admin"
    );

    if (!adminUser) {
      console.log("Usuario no encontrado o no es admin");
      return null;
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);

    return isMatch ? adminUser : null;
  }
}

module.exports = UserService;
