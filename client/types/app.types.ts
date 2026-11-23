import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface CourseType {
  _id: string;
  title: string;
  slug: string;
  level: string;
  category: string;
  excerpt: string;
  forWhom: string;
  whatYouWillLearn: string;
  keywords: string;
  isPublished: boolean;
  type: string;
  createdAt: string;
  previewImage: string;
  previewVideo: string;
}

export interface SectionType {
  _id: string;
  title: string;
  position: number;
  course: string | CourseType;
  lessons: LessonType[];
}

export interface LessonType {
  _id: string;
  title: string;
  position: number;
  content: string;
  videoId: string;
  hours: string;
  minutes: string;
  sectionId: string | SectionType;
  course: string | CourseType;
}

export interface SourceCodeType {
  id: number;
  title: string;
  link: string;
}

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: ImageType;
}

export interface ImageType {
  url: string;
  key: string;
}
