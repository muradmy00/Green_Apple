import express from 'express'
import { loginUser , registerUser, adminLogin, getProfile, updateProfile } from '../controllers/userControllers.js'
import authUser from '../middleware/auth.js';
import upload from '../middleware/multer.js';


const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/get-profile', authUser , getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

export default userRouter;