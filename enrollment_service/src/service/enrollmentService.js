const repo = require('../repository/enrollmentRepository');
const kafkaProducer = require('../kafka/producer');

async function enrollUser(data) {

  if (!data) throw new Error("Enrollment data is undefined");

  const user_id = data.user_id;
  const course_id = data.course_id;

  if (!user_id || !course_id) {
    throw new Error(`Missing fields: user_id=${user_id}, course_id=${course_id}`);
  }

  const enrollment = await repo.enrollUser(user_id, course_id);

  await kafkaProducer.sendMessage("enrollment_created", {
    event: "ENROLLMENT_CREATED",
    userId: user_id,
    courseId: course_id
  });

  return enrollment;
}

async function getEnrollment(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid enrollment id');
  }

  const enrollment = await repo.getEnrollmentById(id);
  if (!enrollment) throw new Error('Enrollment not found');
  return enrollment;
}

async function getAllEnrollments() {
  return await repo.getAllEnrollments();
}

async function deleteEnrollment(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid enrollment id');
  }

  const existing = await repo.getEnrollmentById(id);
  if (!existing) throw new Error('Enrollment not found');

  return await repo.deleteEnrollment(id);
}


module.exports = {
  enrollUser,
  getEnrollment,
  getAllEnrollments,
  deleteEnrollment
};
