import express from 'express';
import { getUserProfile, updateProfile  } from '../controllers/userController.js'
import { authProtect } from '../middlewares/authMiddleware.js';


const router = express.Router();

//user routes 
// get user user profile

router.get('/profile', authProtect , getUserProfile);


//update user profile
router.put('/profile', authProtect , updateProfile);


export default router;