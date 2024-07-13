import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import errorHandler from '../utils/error.js';

const register = async (req, res, next) => {
    const user = req.body;
    user.password = bcryptjs.hashSync(user.password, 10);
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }

};

const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const validUser = await User.findOne({ username });
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = await bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) return next(errorHandler(401, "wrong credentials"));
        const token = jwt.sign({ id: validUser._id, username: validUser.username, fullName: validUser.fullName }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

const logout = (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("User has been logged out!");
    }catch (error) {
        next(error);
    }
};

export { register, login, logout };




