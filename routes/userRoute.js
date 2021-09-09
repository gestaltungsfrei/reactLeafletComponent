import express from 'express';

const userRouter = express.Router();

import {
    getUser, createUser, updateUser, loginUser   
} from '../controllers/userController.js'


userRouter.route('').post(createUser)
userRouter.route('/login/:id/:method').get(getUser).put(updateUser)
userRouter.route('/login').post(loginUser)


export default userRouter