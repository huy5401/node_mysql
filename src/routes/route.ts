import express, {Router, Request, Response} from 'express';
import { createSessionHandler } from '../controllers/session.controller';
import { createUserHandler, getAllUserHandler } from '../controllers/user.controller';
import validateResource from '../middleware/validateResource';
import {createUserSchema} from '../schemas/user.schema';
const router = express.Router();

router.get('/', (req: Request, res:Response) => {
    res.sendStatus(200);
})
router.get('/about' , (req:Request, res: Response) => {
    res.send('about');
})
router.get('/users', getAllUserHandler);
router.post('/users/create', validateResource(createUserSchema), createUserHandler)
router.post('/users/session', createSessionHandler)
export default router