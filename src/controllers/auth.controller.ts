import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../services/auth.service";
import { validatePassword } from "../services/user.service";
import {get, omit} from 'lodash';
import { verifyJwt } from "../utils/jwt.utils";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  // validate password
  const user = await validatePassword(req.body);
  const userOmit = omit(user, "refeshToken");
  const userAgent = req.get("user-agent");
  const objectSign = { ...userOmit, userAgent };
  console.log("id user:  ", user.id)
  // create accesstoken and refesh token
  if (user == null) return res.sendStatus(409).send("Tai khoan khong ton tai");
  const { accessToken, refeshToken } = generateToken(objectSign);
  User.update(
    { refeshToken: refeshToken},
    { where: { id: user.id } }
  ).then(() => {
    console.log("update successfully")
  }).catch((error) => {
    console.log(error);
  })
  res.send({ accessToken, refeshToken, user });

}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {

  // get access token
  // const accessToken = String(get(req,"headers.Authorization","")).replace(/^Bearer\s/,"");
  const accessToken = String(req.get("Authorization")).replace(/^Bearer\s/,"");
  // verify accesstoken 
  const {decoded, expired} = verifyJwt(accessToken);
  if(decoded) return next();
} 