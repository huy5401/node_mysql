import { NextFunction, Request, Response } from "express";
import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export async function createSessionHandler(req:Request, res:Response, next: NextFunction) {
    // validate user
    const user = await validatePassword(req.body);
    if(!user){
        return res.sendStatus(401).send("invalid username or password");
    }

    // create a session
    // const session = await createSession(String(user.id), req.get("user-agent") || "");
    // console.log("session_id: ", session.id);
    //create an access token
    // const accessToken = signJwt(
    //     {...user},
    //     {expiresIn: "5m", algorithm: "RS256"}
    // );
    //const key_path = path.resolve(path.dirname(__filename), "../") + '/config/key/private.txt';
    //const private_key = fs.readFileSync(key_path,{encoding:'utf8', flag:'r'});
    const accessToken =  jwt.sign({...user}, 'secret-key',{
        expiresIn: "5m"
    })

    //create refeshToken
    const refeshToken =  jwt.sign({...user}, 'secret-key',{
        expiresIn: "1y"
    })
    const decoded = jwt.verify(accessToken, 'secret-key');
    return res.send({accessToken, decoded});
}