import express from 'express';
import { enrollStudentInCourse, getCourse , getCourseById, myCourses , ownedCourses , getCourseForLearning , deleteCourse} from '../controllers/courseController.js';
import { authProtect } from '../middlewares/authMiddleware.js';
import { allowRoles } from "../middlewares/allowRoles.js";



const router = express.Router();
//get all courses
router.get('/my-courses',authProtect,myCourses);
router.get('/', getCourse);

// get detail of courses by id
router.get('/:id', getCourseById);

router.delete(
  "/:id",
  authProtect,
  allowRoles("instructor", "admin"),
  deleteCourse
);


//enroll user
router.post('/:id/enroll', authProtect , enrollStudentInCourse);


// getting the already owned course
router.get("/owned", authProtect, ownedCourses);

// getting the course for learn

router.get(
  "/learn/:courseId",
  authProtect,
  getCourseForLearning
);




export default router;