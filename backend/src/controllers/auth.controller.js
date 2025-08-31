require('dotenv').config();
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const CookieOptions = {
    httpOnly: true,
    secure: false,   // set true if using https
    sameSite: "lax"  // or "none" if cross-site cookies
}

const registerUser = async (req, res) => {

    const { username, firstName, lastName, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserExist) {
        return res.status(400).json({ error: 'user already exist with credentials' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({ username, fullName: { firstName, lastName }, email, password: hashedPassword })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)

    res.status(201).cookie("authToken", token, CookieOptions).json({
        message: 'user registered sucessfuly',
        user: {
            _id: user._id,
            username: user.username,
            firstName: user.fullName?.firstName,
            lastName: user.fullName?.lastName,
            email: user.email,
        }
    })

}

const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier, !password) {
        console.log("Identifier and password required")
        return res.status(400).clearCookie('authToken',CookieOptions).json({ error: 'feilds are not provided' })
    }

    const query = identifier.includes('@') ? { email: identifier } : { username: identifier };

    const user = await userModel.findOne(query)

    if (!user) {
        console.log('user not found');
        return res.status(400).clearCookie('authToken',CookieOptions).json({ error: 'user not found' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        console.log('Invalid credentials')
        return res.status(400).clearCookie('authToken',CookieOptions).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.status(200).cookie('authToken', token, CookieOptions).json({
        message: 'login sucessfull',
        user: {
            _id: user._id,
            username: user.username,
            firstName: user.fullName?.firstName,
            lastName: user.fullName?.lastName,
            email: user.email,
        }
    })
}
const verifySession = async (req, res) => {
    const user = req.user;
    if (!user) res.status(400).json({ message: 'please login session faild to verify' })

    res.status(200).json({
        message: 'User session verified',
        user: {
            _id: user._id,
            username: user.username,
            firstName: user.fullName?.firstName,
            lastName: user.fullName?.lastName,
            email: user.email,
        }
    })
}


module.exports = {
    registerUser,
    loginUser,
    verifySession
}