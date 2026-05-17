const userClient = require("../grpc/clients/userClient");
const courseClient = require("../grpc/clients/courseClient");
const enrollmentClient = require("../grpc/clients/enrollmentClient");

const callUnary = (client, methodName, payload) =>
  new Promise((resolve, reject) => {
    const fn = client?.[methodName];
    if (typeof fn !== "function") {
      return reject(
        new Error(
          `gRPC method not found: ${methodName} (client keys: ${Object.keys(
            client || {}
          ).join(", ")})`
        )
      );
    }

    fn.call(client, payload, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

const resolvers = {
  
  users: () => callUnary(userClient, "GetAllUsers", {}).then((r) => r.users),

  user: ({ id }) => callUnary(userClient, "GetUser", { id }),

  searchUsers: ({ keyword }) =>
    callUnary(userClient, "SearchUsers", { keyword }).then((r) => r.users),

  courses: () =>
    callUnary(courseClient, "GetAllCourses", {}).then((r) => r.courses),

  course: ({ id }) => callUnary(courseClient, "GetCourse", { id }),

  searchCourses: ({ keyword }) =>
    callUnary(courseClient, "SearchCourses", { keyword }).then((r) => r.courses),

  enrollments: () =>
    callUnary(enrollmentClient, "GetAllEnrollments", {}).then(
      (r) => r.enrollments
    ),

  enrollment: ({ id }) =>
    callUnary(enrollmentClient, "GetEnrollment", { id }),



  // Mutations
  
  createUser: ({ name, email, password }) =>
    callUnary(userClient, "CreateUser", { name, email, password }),

  updateUser: ({ id, name, email, password }) =>
    callUnary(userClient, "UpdateUser", { id, name, email, password }),

  deleteUser: ({ id }) =>
    callUnary(userClient, "DeleteUser", { id }).then(() => "User deleted"),

  createCourse: ({ title, description, category }) =>
    callUnary(courseClient, "CreateCourse", { title, description, category }),

  updateCourse: ({ id, title, description, category }) =>
    callUnary(courseClient, "UpdateCourse", { id, title, description, category }),

  deleteCourse: ({ id }) =>
    callUnary(courseClient, "DeleteCourse", { id }).then(() => "Course deleted"),

  createEnrollment: ({ user_id, course_id }) =>
    callUnary(enrollmentClient, "EnrollUser", { user_id, course_id })
};

module.exports = resolvers;
