const pool = require('../db');

async function saveNotification(userId, courseId, message) {
  const result = await pool.query(
    `INSERT INTO notifications (user_id, course_id, message)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, courseId, message]
  );

  return result.rows[0];
}

async function getNotificationsByUser(userId) {
  const result = await pool.query(
    `SELECT * FROM notifications
     WHERE user_id = $1
     ORDER BY id DESC`,
    [userId]
  );

  return result.rows;
}

async function getAllNotifications() {
  const result = await pool.query(
    `SELECT * FROM notifications ORDER BY id DESC`
  );

  return result.rows;
}

module.exports = { saveNotification, getNotificationsByUser, getAllNotifications };
