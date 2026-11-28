"use server";

import { axiosClient } from "@/lib/http";
import { CourseType, LessonType, SectionType } from "@/types/app.types";
import { revalidatePath } from "next/cache";

// Course
export const getCourses = async (type: "course" | "project") => {
  const { data } = await axiosClient.get<{ data: CourseType[] }>(
    `/api/admin/courses/${type}`,
  );
  return data;
};

export const getCourse = async (courseId: string) => {
  const { data } = await axiosClient.get<{ data: CourseType }>(
    `/api/admin/course/${courseId}`,
  );
  return data;
};

export const createCourse = async (data: Partial<CourseType>) => {
  const res = await axiosClient.post("/api/admin/course", data);
  revalidatePath("/admin/courses");
  revalidatePath("/admin/projects");
  return res.data;
};

export const updateCourse = async (
  courseId: string,
  data: Partial<CourseType>,
) => {
  const res = await axiosClient.patch(`/api/admin/course/${courseId}`, data);
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/admin/projects/${courseId}`);
  return res.data;
};

export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosClient.delete(`/api/admin/course/${courseId}`);
  revalidatePath("/admin/courses");
  revalidatePath("/admin/projects");
  return data;
};

// Section
export const getSections = async (courseId: string) => {
  const { data } = await axiosClient.get(`/api/admin/sections/${courseId}`);
  return data;
};

export const createSection = async (section: {
  title: string;
  courseId: string;
}) => {
  const { data } = await axiosClient.post("/api/admin/section", section);
  revalidatePath(`/admin/courses/${section.courseId}`);
  return data;
};

export const updateSection = async (
  sectionId: string,
  section: Partial<SectionType>,
) => {
  const { data } = await axiosClient.patch(
    `/api/admin/section/${sectionId}`,
    section,
  );
  revalidatePath("/admin/courses");
  return data;
};

export const deleteSection = async (sectionId: string, courseId: string) => {
  const { data } = await axiosClient.delete(`/api/admin/section/${sectionId}`);
  revalidatePath(`/admin/courses/${courseId}`);
  return data;
};

// Lesson
export const getLessons = async (sectionId: string) => {
  const { data } = await axiosClient.get(`/api/admin/lessons/${sectionId}`);
  return data;
};

export const getProjectLesson = async (courseId: string) => {
  const { data } = await axiosClient.get(
    `/api/admin/project-lessons/${courseId}`,
  );
  return data;
};

export const createLesson = async (data: Partial<LessonType>) => {
  const res = await axiosClient.post("/api/admin/lesson", data);
  revalidatePath(`/admin/courses/${data.course}`);
  return res.data;
};

export const createProjectLesson = async (data: Partial<LessonType>) => {
  const res = await axiosClient.post("/api/admin/project-lesson", data);
  revalidatePath(`/admin/projects/${data.course}`);
  return res.data;
};

export const updateLesson = async (
  lessonId: string,
  data: Partial<LessonType>,
) => {
  const res = await axiosClient.patch(`/api/admin/lesson/${lessonId}`, data);
  revalidatePath(`/admin/courses/${data.course}`);
  revalidatePath(`/admin/projects/${data.course}`);
  return res.data;
};

export const deleteLesson = async (lessonId: string, courseId: string) => {
  const { data } = await axiosClient.delete(`/api/admin/lesson/${lessonId}`);
  revalidatePath(`/admin/courses/${courseId}`);
  return data;
};

export const deleteProjectLesson = async (
  lessonId: string,
  courseId: string,
) => {
  const { data } = await axiosClient.delete(
    `/api/admin/project-lesson/${lessonId}`,
  );
  revalidatePath(`/admin/projects/${courseId}`);
  return data;
};

export const updatePreviewImage = async (
  courseId: string,
  formData: FormData,
) => {
  const { data } = await axiosClient.put(
    `/api/admin/preview-image/${courseId}`,
    formData,
  );
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/admin/projects/${data.course}`);
  return data;
};
