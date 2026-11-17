import z from "zod";

export const courseValidation = z.object({
  title: z.string(),
  slug: z.string(),
  level: z.string(),
  category: z.string(),
  excerpt: z.string().optional(),
  forWhom: z.string().optional(),
  whatYouWillLearn: z.string().optional(),
  keywords: z.string().optional(),
  isPublished: z.boolean().default(false),
  type: z.enum(["course", "project"]),
});

export const updateCourseValidation = courseValidation.partial();

export const sectionValidation = z.object({
  title: z.string(),
  position: z.number().optional(),
  course: z.string(),
  lessons: z.string().optional(),
  courseId: z.string(),
});

export const updateSectionValidation = sectionValidation.partial();
