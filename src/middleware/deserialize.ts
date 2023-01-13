import console from "console";
import { NextFunction, Request, Response } from "express";
import {get} from 'lodash'
import { verifyJwt } from "../utils/jwt.utils";

export const deserialize = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = String(get(req,"headers.Authorization","")).replace(/^Bearer\s/,"");
    
    console.log(accessToken);
    if(!accessToken) return res.sendStatus(403).send("deo vao dc");
    const {decoded, expired} = verifyJwt(accessToken);

    // decode token

    

}