import  {Request, Response, NextFunction} from 'express'
import { CreateUserInput } from '../schemas/user.schema';
import { getAllUser, createUser } from '../services/user.service';

export const getAllUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUser();
        if(!users) return next();
        res.send(users);
    } catch (error:any) {
        res.sendStatus(409).send(error.message);
    }
}

export const createUserHandler = async (req: Request<{},{}, CreateUserInput["body"]>, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {  
        const user = await createUser(req.body);
        if(!user) res.sendStatus(409).send("Error create user");
        res.send(user);
    } catch (error:any) {
        res.sendStatus(409).send(error.message);
    }
}