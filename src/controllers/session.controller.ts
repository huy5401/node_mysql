import { NextFunction, Request, Response } from "express";
import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

export async function createSessionHandler(req:Request, res:Response, next: NextFunction) {
    // validate user
    const user = await validatePassword(req.body);
    if(!user){
        return res.sendStatus(401).send("invalid username or password");
    }
    console.log(user);

    // create a session
    // const session = await createSession(String(user.id), req.get("user-agent") || "");
    // console.log("session_id: ", session.id);
    // create an access token
    // const accessToken = signJwt(
    //     {...user},
    //     {expiresIn: "5m", algorithm: "RS256"}
    // );S
    const private_key:any = process.env.PRIVATE_KEY;
    console.log(private_key);
    const accessToken =  jwt.sign({...user, session: '1'}, private_key,{
        expiresIn: "5m", algorithm:"RS256"
    })

    // create refeshToken
    // const refeshToken = signJwt(
    //     {...user},
    //     {expiresIn: "1y", algorithm:"RS256"}
    // );
    return res.send({accessToken});
}