const service = require('../service/userService');

module.exports = {

  CreateUser: async (call, callback) => {
    try {
      const user = await service.createUser(call.request);
      callback(null, user);
    } catch (err) {
      callback({ code: 3, message: err.message });
    }
  },

  GetUser: async (call, callback) => {
    try {
      const user = await service.getUser(call.request.id);
      callback(null, user);
    } catch (err) {
      callback({ code: 5, message: err.message });
    }
  },

  GetAllUsers: async (_, callback) => {
    try {
      const users = await service.getAllUsers();
      callback(null, { users });
    } catch (err) {
      callback({ code: 13, message: err.message });
    }
  },

  UpdateUser: async (call, callback) => {
    try {
      const user = await service.updateUser(call.request);
      callback(null, user);
    } catch (err) {
      callback({ code: 3, message: err.message });
    }
  },

   DeleteUser: async (call, callback) => {
    try {
      const result = await service.deleteUser(call.request.id);
      callback(null, result);  
    } catch (err) {
      callback({ code: 5, message: err.message });
    }
  },

  SearchUsers: async (call, callback) => {
    try {
      const users = await service.searchUsers(call.request.keyword);
      callback(null, { users });
    } catch (err) {
      callback({ code: 3, message: err.message });
    }
  }
};
