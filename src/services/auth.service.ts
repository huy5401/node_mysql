import { UserInput } from "../models/user.model";
import jwt from 'jsonwebtoken'

export const generateToken = (object: Object) => {
    const accessToken =  jwt.sign(object, 'secret-key',{
        expiresIn: "5m"
    })

    const refeshToken = jwt.sign(object, 'secret-key', {
        expiresIn: '1y'
    })
    return {accessToken, refeshToken}
}

export const reIssueAccessToken = (refeshToken:String) => {
    
}