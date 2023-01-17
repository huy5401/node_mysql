import  {Request, Response, NextFunction} from 'express'
import { CreateUserInput } from '../schemas/user.schema';
import { getAllUser, createUser, getUser } from '../services/user.service';

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
    try {  
        const user = await createUser(req.body);
        if(!user) res.sendStatus(409).send("Error create user");
        res.send(user);
    } catch (error:any) {
        res.sendStatus(409).send(error.message);
    }
}

export const getUserHandler = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const user = await getUser(res.locals.user["id"]);
        console.log("user: ",user);
        if(!user) return res.send(500).send("khong tim thay user");
        res.send(user);
    } catch (error) {
        res.sendStatus(409).send(error);
    }
}