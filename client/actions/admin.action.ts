"use server";

import { axiosClient } from "@/lib/http";
import { CourseType } from "@/types/app.types";
import { revalidatePath } from "next/cache";

export const getCourses = async () => {
  const res = await axiosClient.get<{ data: CourseType[] }>(
    "/api/admin/courses",
  );
  return res.data;
};

export const getCourse = async (courseId: string) => {
  const res = await axiosClient.get<{ data: CourseType }>(
    `/api/admin/course/${courseId}`,
  );
  return res.data;
};

export const createCourse = async (data: Partial<CourseType>) => {
  const res = await axiosClient.post("/api/admin/course", data);
  revalidatePath("/admin/courses");
  return res.data;
};

export const updateCourse = async (
  courseId: string,
  data: Partial<CourseType>,
) => {
  const res = await axiosClient.patch(`/api/admin/course/${courseId}`, data);
  revalidatePath(`/admin/courses/${courseId}`);
  return res.data;
};

export const deleteCourse = async (courseId: string) => {
  const res = await axiosClient.delete(`/api/admin/course/${courseId}`);
  revalidatePath("/admin/courses");
  return res.data;
};
