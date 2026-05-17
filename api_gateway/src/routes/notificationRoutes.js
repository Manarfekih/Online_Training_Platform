const express = require('express');
const router = express.Router();

const notificationClient = require('../grpc/clients/notificationClient');

// GET ALL NOTIFICATIONS
router.get('/', (req, res) => {
  notificationClient.GetAllNotifications({}, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.notifications);
  });
});

// GET NOTIFICATIONS BY USER
router.get('/user/:user_id', (req, res) => {
  const user_id = parseInt(req.params.user_id);

  if (!Number.isInteger(user_id) || user_id <= 0) {
    return res.status(400).json({ error: 'Invalid user_id' });
  }

  notificationClient.GetNotificationsByUser({ user_id }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.notifications);
  });
});

module.exports = router;
