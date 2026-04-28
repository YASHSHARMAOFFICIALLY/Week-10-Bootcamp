import { verifyToken } from "@lib/jwt";
import type { Request } from "express";

export const getUserfromToken = (req:Request) =>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new Error("Unauthorized")
    }

    const token = authHeader.split(" ")[1]
    
    if(!token){
        throw new Error("Unauthorized")
    }
    const decoded = verifyToken(token)
    return decoded.userId
}