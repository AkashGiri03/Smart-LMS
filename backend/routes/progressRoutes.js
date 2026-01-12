import express from 'express';
import { updateProgress , getProgress , myProgress } from '../controllers/progressController.js';
import { authProtect } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.get("/my-courses", authProtect, myProgress);
router.get("/:courseId", authProtect, getProgress);
router.post("/update", authProtect, updateProgress);


export default router;