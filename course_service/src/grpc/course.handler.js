const service = require('../service/courseService');

module.exports = {

  CreateCourse: async (call, callback) => {
    try {
      const result = await service.createCourse(call.request);
      callback(null, result);
    } catch (err) {
      callback({ code: 3, message: err.message });
    }
  },

  GetCourse: async (call, callback) => {
    try {
      const result = await service.getCourse(call.request.id);
      callback(null, result);
    } catch (err) {
      callback({ code: 5, message: err.message });
    }
  },

  GetAllCourses: async (_, callback) => {
    try {
      const result = await service.getAllCourses();
      callback(null, { courses: result });
    } catch (err) {
      callback({ code: 13, message: err.message });
    }
  },

  UpdateCourse: async (call, callback) => {
    try {
      const result = await service.updateCourse(call.request);
      callback(null, result);
    } catch (err) {
      callback({ code: 3, message: err.message });
    }
  },

  DeleteCourse: async (call, callback) => {
    try {
      const result = await service.deleteCourse(call.request.id);
      callback(null, result);
    } catch (err) {
      callback({ code: 5, message: err.message });
    }
  },

  SearchCourses: async (call, callback) => {
    try {
      const result = await service.searchCourses(call.request.keyword);
      callback(null, { courses: result });
    } catch (err) {
      callback({ code: 3, message: err.message });
    }
  }

};
