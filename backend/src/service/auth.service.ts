import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@lib/prisma";
import { email } from "zod";
import { signToken } from "@lib/jwt";
const SALT_ROUNDS = 12;

type SignupInput = {
  name: string;
  email: string;
  password: string;
  username: string;
};

export const signupService = async({name,email,password,username}:SignupInput)=>{
    const existingUser = await prisma.user.findFirst({
        where:{
            OR:[{email},{username}]
        },select: {
            email:true,
            username:true
        }
    })

      if (existingUser?.email === email) {
    throw new Error("Email already in use");
  }

  if (existingUser?.username === username) {
    throw new Error("Username already in use");
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await prisma.user.create({
        data:{name,email,password:hashedPassword,username},
        select:{
        id: true,
        name: true,
        email: true,
        username: true,
        },
    });
    return {
      message: "User created successfully",
      user,
    };
  }catch(error){
    throw new Error ("username or email already exist ")
  }


}

export const loginService = async(email:string,password:string)=>{
    const user = await prisma.user.findUnique({
        where:{email}
    })
    if(!user || !user.password){
        throw new Error("All field are required")
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match) throw new Error ("Password is Incorrect")
    
    const token = signToken(user.userId)

    return {
        message:"signin sucessfull",
        token
    }
    
}
