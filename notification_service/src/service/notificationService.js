const repo = require('../repository/notificationRepository');

async function handleEnrollmentEvent(data) {
  if (!data) throw new Error('Event payload is missing');

  const message = `User ${data.userId} enrolled in course ${data.courseId}`;

  const saved = await repo.saveNotification(
    data.userId,
    data.courseId,
    message
  );

  console.log("Notification stored:", saved);

  return saved;
}

async function getNotificationsByUser(user_id) {
  if (!Number.isInteger(user_id) || user_id <= 0) {
    throw new Error('Invalid user_id');
  }

  return await repo.getNotificationsByUser(user_id);
}

async function getAllNotifications() {
  return await repo.getAllNotifications();
}

module.exports = { handleEnrollmentEvent, getNotificationsByUser, getAllNotifications };
