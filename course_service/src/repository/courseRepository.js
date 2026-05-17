const pool = require('../db');

async function createCourse(title, description, category) {
  const result = await pool.query(
    `INSERT INTO courses (title, description, category)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, description, category]
  );

  return result.rows[0];
}

async function getCourseById(id) {
  const result = await pool.query(
    `SELECT * FROM courses WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

async function getAllCourses() {
  const result = await pool.query(
    `SELECT * FROM courses ORDER BY id ASC`
  );
  return result.rows;
}

async function updateCourse(id, title, description, category) {
  const result = await pool.query(
    `UPDATE courses
     SET title = $1, description = $2, category = $3
     WHERE id = $4
     RETURNING *`,
    [title, description, category, id]
  );

  return result.rows[0];
}

async function deleteCourse(id) {
  await pool.query(
    `DELETE FROM courses WHERE id = $1`,
    [id]
  );

  return { message: "Course deleted successfully",
          success: true 
  };
}

async function searchCourses(keyword) {
  const result = await pool.query(
    `SELECT * FROM courses
     WHERE title ILIKE $1 OR category ILIKE $1`,
    [`%${keyword}%`]
  );

  return result.rows;
}

module.exports = {
  createCourse,
  getCourseById,
  getAllCourses,
  updateCourse,
  deleteCourse,
  searchCourses
};