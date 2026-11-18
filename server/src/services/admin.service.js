import courseModel from "../models/course.model.js";
import lessonModel from "../models/lesson.model.js";
import sectionModel from "../models/section.model.js";

// Course

export const getAllCourses = async () => {
  const courses = await courseModel.find().lean();
  return courses;
};

export const getOneCourse = async (id) => {
  const course = await courseModel.findById(id);
  if (!course) throw new Error("Course not found");

  return course;
};

export const createCourse = async (data) => {
  const { slug } = data;
  const course = await courseModel.findOne({ slug });

  if (course) {
    throw new Error("Course with this slug already exists");
  }

  const newCourse = await courseModel.create(data);

  return newCourse;
};

export const editCourse = async (id, data) => {
  const existCourse = await courseModel.findById(id);
  if (!existCourse) throw new Error("Course not found");

  const updatedCourse = await courseModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedCourse;
};

export const deleteCourse = async (id) => {
  const course = await courseModel.findById(id);
  if (!course) throw new Error("Course not found");

  await courseModel.findByIdAndDelete(id);

  return;
};

// Section

export const getSections = async (courseId) => {
  const sections = await sectionModel
    .find({ course: courseId })
    .sort({ position: 1 });

  return sections;
};

export const createSection = async (data) => {
  const { title, courseId } = data;

  const lastSection = await sectionModel
    .findOne({ course: courseId })
    .sort({ position: -1 });
  const position = lastSection ? lastSection.position + 1 : 1;

  const createdSection = await sectionModel.create({
    title,
    position,
    course: courseId,
  });

  return createdSection;
};

export const updateSection = async (id, data) => {
  const existSection = await sectionModel.findById(id);
  if (!existSection) throw new Error("Section not found");

  const updatedSection = await sectionModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedSection;
};

export const deleteSection = async (id) => {
  const existSection = await sectionModel.findById(id);
  if (!existSection) throw new Error("Section not found");

  await lessonModel.deleteMany({ sectionId: id });
  await sectionModel.findByIdAndDelete(id);

  return existSection;
};

// Lesson

export const getLessons = async (sectionId) => {
  const sections = await lessonModel.find({ sectionId }).sort({ position: 1 });

  return sections;
};

export const createLesson = async (data) => {
  const { sectionId, ...payload } = data;

  const lastLesson = await lessonModel
    .findOne({ sectionId })
    .sort({ position: -1 });
  const position = lastLesson ? lastLesson.position + 1 : 1;

  const createdLesson = await lessonModel.create({
    ...payload,
    position,
    sectionId,
  });

  await sectionModel.findByIdAndUpdate(
    sectionId,
    { $push: { lessons: createdLesson._id } },
    { new: true },
  );

  return createdLesson;
};

export const updateLesson = async (id, data) => {
  const existLesson = await lessonModel.findById(id);
  if (!existLesson) throw new Error("Lesson not found");

  const updatedLesson = await lessonModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedLesson;
};

export const deleteLesson = async (id) => {
  const existLesson = await lessonModel.findById(id);
  if (!existLesson) throw new Error("Lesson not found");

  await sectionModel.findByIdAndUpdate(existLesson.sectionId, {
    $pull: { lessons: existLesson._id },
  });
  await lessonModel.findByIdAndDelete(id);

  return existLesson;
};
