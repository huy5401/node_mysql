import Session from "../models/session.model";

export async function createSession(userId:string,userAgent:string) : Promise<any>{
    try {  
        return await Session.create({userId, userAgent}).then((session) => {
            return session;
        });
    } catch (error:any) {
        throw new Error(error);
    }

}