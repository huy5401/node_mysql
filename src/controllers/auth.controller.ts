import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../services/auth.service";
import { getUser, validatePassword } from "../services/user.service";
import { get, omit } from 'lodash';
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import jwt from 'jsonwebtoken';

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
    { refeshToken: refeshToken },
    { where: { id: user.id } }
  ).then(() => {
    console.log("update successfully")
  }).catch((error) => {
    console.log(error);
  })
  res.send({ accessToken, refeshToken, user });

}

export const refesh = async (req: Request, res: Response, next: NextFunction) => {

  try {
    // get access token
    // const accessToken = String(get(req,"headers.Authorization","")).replace(/^Bearer\s/,"");
    const { refeshToken } = req.body;
    console.log("refesh token in refesh: ", refeshToken);
    if (refeshToken) {
      // const { decoded } = verifyJwt(refeshToken);
      // const user = decoded;
      const user = await User.findAll({where: {refeshToken: refeshToken}});
      //console.log("user in refesh", user);
      if (user) {
        const userOmit = omit(user[0].dataValues, "refeshToken", "password");
        const userAgent = req.get("user-agent");
        const objectSign = { ...userOmit, userAgent };
        console.log("object sign in refesh: ", objectSign);
        const { accessToken } = generateToken(objectSign);
        console.log("access token in refesh");
        res.send(accessToken);
      }
    }
  } catch (e) {
    res.send(e);
  }
}
