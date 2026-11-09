import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface CourseType {
  slug: string;
  title: string;
  thumbnail: string;
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
