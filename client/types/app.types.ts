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
