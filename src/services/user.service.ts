import { omit } from "lodash";
import User from "../models/user.model";
import { UserInput } from "../models/user.model";


export const getAllUser = async () => {
    try {
        const users = User.findAll();
        if (!users) return false;
        return users;
    } catch (e: any) {
        throw new Error(e);
    }
}

export const createUser = (input: Omit<UserInput, "passwordConfirmation">) => {
    try {
        return User.create(input).then((user) => {
            return user;
        }).catch(() => {
            return false;
        }

        );
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword({ username, password }: {
    username: string;
    password: string;
}): Promise<any> {
    return User.findOne({ where: { username: username, password: password } }).then((user) => {
        return user ? omit(user.toJSON(), "password") : false;
    });
}