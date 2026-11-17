import * as AdminService from "../services/admin.service.js";
import catchAsync from "../utils/catchAsync.js";
import {
  courseValidation,
  updateCourseValidation,
} from "../validations/course.validation.js";
import { idValidation } from "../validations/id.validation.js";

// Course
export const getCourses = catchAsync(async (req, res) => {
  const data = await AdminService.getAllCourses();

  if (!data) throw new Error("Course not found");

  return res
    .status(200)
    .json({ message: "Courses retrieved successfully", data, success: true });
});

export const getCourse = catchAsync(async (req, res) => {
  const result = idValidation.safeParse(req.params);
  if (!result.success) throw new Error("Invalid ID");

  const data = await AdminService.getOneCourse(result.data.id);

  return res
    .status(200)
    .json({ message: "Course retrieved successfully", data, success: true });
});

export const createCourse = catchAsync(async (req, res) => {
  const result = courseValidation.safeParse(req.body);
  if (!result.success) throw new Error("Validation failed!");

  const data = await AdminService.createCourse(result.data);

  return res
    .status(201)
    .json({ message: "Course created successfully", data, success: true });
});

export const updateCourse = catchAsync(async (req, res) => {
  const idResult = idValidation.safeParse(req.params);
  if (!idResult.success) throw new Error("Invalid ID");

  const result = updateCourseValidation.safeParse(req.body);
  if (!result.success) throw new Error("Validation failed!");

  const data = await AdminService.editCourse(idResult.data.id, result.data);

  return res
    .status(200)
    .json({ message: "Course updated successfully", data, success: true });
});

export const deleteCourse = catchAsync(async (req, res) => {
  const result = idValidation.safeParse(req.params);
  if (!result.success) throw new Error("Invalid ID");

  await AdminService.deleteCourse(result.data.id);

  return res
    .status(200)
    .json({ message: "Course deleted successfully", success: true });
});

// Section
export const getSections = catchAsync(async (req, res) => {
  const data = await AdminService.getSections(req.params.courseId);

  return res
    .status(200)
    .json({ message: "Sections retrieved successfully", data, success: true });
});

export const createSection = catchAsync(async (req, res) => {
  const data = await AdminService.createSection(req.body);

  return res
    .status(201)
    .json({ message: "Section created successfully", data, success: true });
});

export const updateSection = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await AdminService.updateSection(id, req.body);

  return res
    .status(200)
    .json({ message: "Section updated successfully", data, success: true });
});

export const deleteSection = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminService.deleteSection(id);

  return res
    .status(200)
    .json({ message: "Section deleted successfully", success: true });
});

// Lesson
export const getLessons = catchAsync(async (req, res) => {
  const data = await AdminService.getLessons(req.params.sectionId);

  return res
    .status(200)
    .json({ message: "Lessons retrieved successfully", data, success: true });
});

export const createLesson = catchAsync(async (req, res) => {
  const data = await AdminService.createLesson(req.body);

  return res
    .status(201)
    .json({ message: "Lesson created successfully", data, success: true });
});

export const updateLesson = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await AdminService.updateLesson(id, req.body);

  return res
    .status(200)
    .json({ message: "Lesson updated successfully", data, success: true });
});

export const deleteLesson = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminService.deleteLesson(id);

  return res
    .status(200)
    .json({ message: "Lesson deleted successfully", success: true });
});
