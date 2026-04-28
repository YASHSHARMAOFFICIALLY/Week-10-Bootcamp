import {z} from 'zod'

export const signupSchema = z.object({
    username:z.string().min(4,"minium 4 character require "),
    name:z.string().min(4,"4 word are required"),
    email:z.string().email(),
    password:z.string().min(8,"8 character minium")
        .regex(/[A-Z]/,"uppercase required")
        .regex(/[a-z]/,"lower case required")
        .regex(/[1-9]/,"Integer required")
})
export const signinSchema = z.object({
    username:z.string().min(4,"minium 4 character required"),
    password:z.string().min(8,"8 character required")
})