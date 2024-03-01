import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({})
        //console.log(req.query)

        res.json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        //console.log(user);
        if (user)
            return next(new ErrorHandler("User Already Exist", 400));

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        sendCookies(user, res, "Registed Successfully", 201)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        //console.log(user);
        if (!user)
            return next(new ErrorHandler("Invalid Email or Password", 400));
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return next(new ErrorHandler("Invalid Email or Password", 400));
        sendCookies(user, res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error)
    }
}

export const getMyProfile = (req, res, next) => {
    try {

        //console.log(req.user);
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    try {
        res
            .status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
            })
            .json({
                success: true,
                user: req.user,
            })
    } catch (error) {
        next(error)
    }
}

/* 
export const getAllUser = async (req, res) => {

    const users = await User.find({})
    console.log(req.query)

    res.json({
        success: true,
        users,
    });
}

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password,
    })

    res.status(201).cookie("temp", "lol").json({
        success: true,
        message: "Registered Successfully",
    });
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    
}

export const specialuser = async (req, res) => {
    res.json({
        success:true,
        message: "Just Joking"
    })
}

export const getUserDetail = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    res.json({
        success: true,
        user,
    })
} */
/* 
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    res.json({
        success: true,
        message: "Details Updated",
    })
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    //await user.remove()
    res.json({
        success: true,
        message: "Delete",
    })
} */