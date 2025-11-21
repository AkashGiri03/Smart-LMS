import express from 'express';


const router = express.Router();

router.post('/', getCourse);
router.post('/:id', getCourseById);

export default router;