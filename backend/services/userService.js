const bcrypt = require("bcrypt");
const Database = require("../config/database");

class UserService {
  // Método para autenticar usuarios regulares (email o DNI)
  static async authenticateUser(identifier, password) {
    const users = Database.loadUsers();

    // Buscar usuario por email o DNI y que tenga rol "user"
    const user = users.find(
      (u) =>
        (u.email === identifier || u.dni === identifier) && u.role === "user"
    );

    if (!user) {
      console.log("Usuario no encontrado");
      return null;
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  // Método para autenticar administradores
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

  // Método para registrar usuarios
  static async registerUser(userData) {
    const users = Database.loadUsers();

    // Verificar si el email o el DNI ya están registrados
    const existingUser = users.find(
      (u) => u.email === userData.email || u.dni === userData.dni
    );
    if (existingUser) {
      throw new Error("El correo electrónico o el DNI ya están registrados");
    }

    // Generar un nuevo ID
    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Crear nuevo usuario
    const newUser = {
      id: newId,
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      dni: userData.dni,
      password: hashedPassword,
      points: 0,
      role: "user",
    };

    // Agregar nuevo usuario
    users.push(newUser);

    // Guardar usuarios actualizados
    Database.saveUsers(users);

    // Devolver usuario sin contraseña
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}

module.exports = UserService;
