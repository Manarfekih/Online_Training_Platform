const service = require('../service/notificationService');

module.exports = {
  Ping: async (_, callback) => {
    callback(null, { response: 'Notification service alive' });
  },

  GetNotificationsByUser: async (call, callback) => {
    try {
      const notifications = await service.getNotificationsByUser(call.request.user_id);
      callback(null, { notifications });
    } catch (err) {
      callback({ code: 3, message: err.message });
    }
  },

  GetAllNotifications: async (_, callback) => {
    try {
      const notifications = await service.getAllNotifications();
      callback(null, { notifications });
    } catch (err) {
      callback({ code: 13, message: err.message });
    }
  }
};
