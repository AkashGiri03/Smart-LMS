import express from 'express';


const router = express.Router();

router.get('/', getCategory);


export default router;