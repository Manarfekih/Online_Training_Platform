const repo = require('../repository/courseRepository');

async function createCourse(data) {
  if (!data?.title || !data?.description || !data?.category) {
    throw new Error('Missing fields: title, description, category');
  }

  return await repo.createCourse(
    data.title,
    data.description,
    data.category
  );
}

async function getCourse(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid course id');
  }

  const course = await repo.getCourseById(id);
  if (!course) throw new Error('Course not found');
  return course;
}

async function getAllCourses() {
  return await repo.getAllCourses();
}

async function updateCourse(data) {

  if (!Number.isInteger(data?.id) || data.id <= 0) {
    throw new Error('Invalid course id');
  }
  
  const existing = await repo.getCourseById(data.id);
  if (!existing) throw new Error('Course not found');
  
  const title = data.title || existing.title;
  const description = data.description || existing.description;
  const category = data.category || existing.category;
  
  return await repo.updateCourse(data.id, title, description, category);
}

async function deleteCourse(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid course id');
  }

  const existing = await repo.getCourseById(id);
  if (!existing) throw new Error('Course not found');

  return await repo.deleteCourse(id);
}

async function searchCourses(keyword) {
  if (!keyword) throw new Error('Missing keyword');
  return await repo.searchCourses(keyword);
}

module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  searchCourses
};
