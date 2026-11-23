import express from "express";
import * as AdminController from "../controllers/admin.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

// Course
router.get("/courses", AdminController.getCourses);
router.get("/course/:id", AdminController.getCourse);
router.post("/course", AdminController.createCourse);
router.patch("/course/:id", AdminController.updateCourse);
router.delete("/course/:id", AdminController.deleteCourse);

// Section
router.get("/sections/:courseId", AdminController.getSections);
router.post("/section", AdminController.createSection);
router.patch("/section/:id", AdminController.updateSection);
router.delete("/section/:id", AdminController.deleteSection);

// Lesson
router.get("/lessons/:sectionId", AdminController.getLessons);
router.post("/lesson", AdminController.createLesson);
router.patch("/lesson/:id", AdminController.updateLesson);
router.delete("/lesson/:id", AdminController.deleteLesson);

router.put(
  "/preview-image/:id",
  upload.single("previewImage"),
  AdminController.uploadPreviewImage,
);

export default router;
