import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
export const signToken = (userId) => {
    return jwt.sign({
        userId
    }, JWT_SECRET, {
        expiresIn: "7d"
    });
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new Error("Invalid token");
    }
};
//# sourceMappingURL=jwt.js.map