import {object, string, TypeOf} from 'zod';

export const createUserSchema = object({
    body: object ({
        username: string({
            required_error: 'username is required'
        }),
        password: string({
            required_error: 'password is required',
        }).min(6, "password too short - should be 6 chars minimums"),
        passwordConfirmation: string({
            required_error: 'password confirm is required'
        }),
    }).refine((data) => data.password == data.passwordConfirmation,
    {
        message: "password do not match",
        path: ["passwordConfirmation"],
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">;