import jwt from 'jsonwebtoken';
import { User } from "../models/user.js";
import ErrorHandler from './error.js';
export const isAuthenticated = async (req, res, next) => {
    
    const { token }= req.cookies;
    //console.log(token);
    if(!token)
        return next(new ErrorHandler("Login First", 400));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.user = await User.findById(decoded._id);
    next();
}