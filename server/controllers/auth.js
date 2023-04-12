const User = require("../models/user");
const { UnauthorizedError, NotFoundError } = require("../errors/index");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(200).json({
        msg: `Created user ${newUser.name}`,
        user: newUser,
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        throw new NotFoundError(`No user with email ${email}`);
    }

    const passwordCorrect = await foundUser.verifyPassword(password);
    if (!passwordCorrect) {
        throw new UnauthorizedError("Incorrect password");
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });

    res.status(200).json({
        msg: `Welcome back, ${foundUser.name}`,
        user: foundUser,
        token,
    });
};

module.exports = { loginUser, registerUser };
