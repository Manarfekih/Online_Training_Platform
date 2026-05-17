const repo = require('../repository/userRepository');
const bcrypt = require('bcrypt');

async function createUser(data) {

  if (!data.name || !data.email || !data.password) {
    throw new Error("Missing required fields");
  }

  // email must contain @
  if (!data.email.includes('@')) {
    throw new Error("Invalid email format");
  }

  // email unique
  const existingUser = await repo.getUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await repo.createUser(
    data.name,
    data.email,
    hashedPassword
  );

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

async function getUser(id) {

  const user = await repo.getUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

async function getAllUsers() {

  const users = await repo.getAllUsers();

  return users.map(({ password, ...user }) => user);
}

async function updateUser(data) {

  const existingUser = await repo.getUserById(data.id);

  if (!existingUser) {
    throw new Error("User not found");
  }

  if (data.email && !data.email.includes('@')) {
    throw new Error("Invalid email format");
  }

  let hashedPassword = existingUser.password;

  if (data.password) {
    hashedPassword = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await repo.updateUser(
    data.id,
    data.name || existingUser.name,
    data.email || existingUser.email,
    hashedPassword
  );

  const { password, ...userWithoutPassword } = updatedUser;

  return userWithoutPassword;
}

async function deleteUser(id) {

  const user = await repo.getUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await repo.deleteUser(id);

  return {
    message: "User deleted successfully",
    success: true 
  };
}

async function searchUsers(keyword) {

  const users = await repo.searchUsers(keyword);

  return users.map(({ password, ...user }) => user);
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  searchUsers
};