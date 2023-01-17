import express, {Router, Request, Response} from 'express';
import { login, refesh } from '../controllers/auth.controller';
import { createSessionHandler } from '../controllers/session.controller';
import { createUserHandler, getAllUserHandler, getUserHandler } from '../controllers/user.controller';
import { isAuth } from '../middleware/isAuth';
import validateResource from '../middleware/validateResource';
import {createUserSchema} from '../schemas/user.schema';
const router = express.Router();

router.get('/', (req: Request, res:Response) => {
    res.sendStatus(200);
})
router.get('/about' , (req:Request, res: Response) => {
    res.send('about');
})
router.get('/user',isAuth, getUserHandler);
router.post('/users/create', validateResource(createUserSchema), createUserHandler)
router.post('/users/session',createSessionHandler)
router.post('/login', login);
router.post('/refesh', refesh);
export default router