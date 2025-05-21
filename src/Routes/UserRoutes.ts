import express from 'express';
import { addUser, LoginUser } from '../Controller/UserController';
import { validateUserInput, validateUserLoginInput } from '../middleware/validation';
import { validateOrigin } from '../middleware/OriginValidation';

const router = express.Router();

//add User
router.post('/user/addUser', addUser);

//LoginUser
router.post('/user/login', validateOrigin, validateUserLoginInput, LoginUser)

export default router;