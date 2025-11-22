import express from 'express';
import { getCourse , getCourseById } from '../controllers/courseController.js';


const router = express.Router();

router.get('/', getCourse);
router.get('/:id', getCourseById);

export default router;