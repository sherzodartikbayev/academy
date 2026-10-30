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
  email: string;
  firstName: string;
  lastName: string;
}
