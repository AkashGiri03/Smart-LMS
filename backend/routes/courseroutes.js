import express from 'express';
import { enrollStudentInCourse, getCourse , getCourseById, myCourses } from '../controllers/courseController.js';
import { authProtect } from '../middlewares/authMiddleware.js';


const router = express.Router();
//get all courses
router.get('/my-courses',authProtect,myCourses);
router.get('/', getCourse);

// get detail of courses by id
router.get('/:id', getCourseById);

//enroll user
router.post('/:id/enroll', authProtect , enrollStudentInCourse);



export default router;