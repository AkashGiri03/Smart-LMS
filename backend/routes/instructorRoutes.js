import express from "express";
import { authProtect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { getInstructorCourses, createCourse , addModule , addLesson , deleteModule , deleteLesson} from "../controllers/instructorController.js";

const router = express.Router();

router.get(
  "/courses",
  authProtect,
  allowRoles("instructor", "admin"),
  getInstructorCourses
);

router.post(
  "/courses",
  authProtect,
  allowRoles("instructor", "admin"),
  createCourse
);

router.post(
  "/courses/:id/modules",
  authProtect,
  allowRoles("instructor", "admin"),
  addModule
);

router.post(
  "/courses/:courseId/modules/:moduleIndex/lessons",
  authProtect,
  allowRoles("instructor", "admin"),
  addLesson
);

//deleting 
router.delete(
  "/courses/:courseId/modules/:moduleIndex",
  authProtect,
  allowRoles("instructor", "admin"),
  deleteModule
);

router.delete(
  "/courses/:courseId/modules/:moduleIndex/lessons/:lessonIndex",
  authProtect,
  allowRoles("instructor", "admin"),
  deleteLesson
);




export default router;
