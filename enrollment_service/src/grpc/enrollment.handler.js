const service = require('../service/enrollmentService');

module.exports = {

  EnrollUser: async (call, callback) => {
    try {
      console.log("DEBUG REQUEST:", call.request);

      const result = await service.enrollUser(call.request);
      callback(null, result);

    } catch (err) {
      callback({ code: 3, message: err.message });
    }
  },

  GetEnrollment: async (call, callback) => {
    try {
      const result = await service.getEnrollment(call.request.id);
      callback(null, result);
    } catch (err) {
      callback({ code: 5, message: err.message });
    }
  },

  GetAllEnrollments: async (_, callback) => {
    try {
      const result = await service.getAllEnrollments();
      callback(null, { enrollments: result });
    } catch (err) {
      callback({ code: 13, message: err.message });
    }
  },

  DeleteEnrollment: async (call, callback) => {
    try {
      const result = await service.deleteEnrollment(call.request.id);
      callback(null, result);
    } catch (err) {
      callback({ code: 5, message: err.message });
    }
  },

  

};
