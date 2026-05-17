const pool = require('../db');

async function createUser(name, email, password) {

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [name, email, password]
  );

  return result.rows[0];
}

async function getAllUsers() {

  const result = await pool.query(
    `SELECT * FROM users ORDER BY id ASC`
  );

  return result.rows;
}

async function getUserById(id) {

  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );

  return result.rows[0];
}

async function getUserByEmail(email) {

  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0];
}

async function updateUser(id, name, email, password) {

  const result = await pool.query(
    `
    UPDATE users
    SET name = $1,
        email = $2,
        password = $3
    WHERE id = $4
    RETURNING *;
    `,
    [name, email, password, id]
  );

  return result.rows[0];
}

async function deleteUser(id) {

  await pool.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  );
}

async function searchUsers(keyword) {

  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE name ILIKE $1
       OR email ILIKE $1
    `,
    [`%${keyword}%`]
  );

  return result.rows;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  searchUsers
};