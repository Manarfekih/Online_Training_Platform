const pool = require('../db');

async function enrollUser(userId, courseId) {
  const result = await pool.query(
    `INSERT INTO enrollments (user_id, course_id)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, courseId]
  );

  return result.rows[0];
}

async function getEnrollmentById(id) {
  const result = await pool.query(
    `SELECT * FROM enrollments WHERE id = $1`,
    [id]
  );

  return result.rows[0];
}

async function getAllEnrollments() {
  const result = await pool.query(
    `SELECT * FROM enrollments ORDER BY id ASC`
  );

  return result.rows;
}

async function deleteEnrollment(id) {
  const result = await pool.query(
    `DELETE FROM enrollments WHERE id = $1`,
    [id]
  );

  if (result.rowCount === 0) {
    return { message: "Enrollment not found", success: false };
  }

  return { message: "Enrollment deleted successfully", success: true };
}



module.exports = {
  enrollUser,
  getEnrollmentById,
  getAllEnrollments,
  deleteEnrollment
};
