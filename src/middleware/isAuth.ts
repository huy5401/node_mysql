import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt.utils";

export const isAuth = (req: Request, res:Response, next: NextFunction) => {
    try {
        const access_token = String(req.get("Authorization")).replace(/^Bearer\s/, "");
        console.log("accesstoken after authen: ", access_token);
        const {decoded, expired} =  verifyJwt(access_token);
        console.log("decoded after auth: ", decoded)
        console.log(expired);
        if(expired) return res.sendStatus(401).send("access token is expired");
        res.locals.user = decoded;
        return next();
    } catch (error) {
        res.send(error);
    }
}