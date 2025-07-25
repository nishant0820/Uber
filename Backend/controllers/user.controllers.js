const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const blackListTokenModel = require('../models/blacklistToken.model')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password } = req.body
    const isUserExists = await userModel.findOne({ email });
        if(isUserExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
    const hashesPassword = await userModel.hashPassword(password)
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashesPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({
        message: 'User registered successfully',
        user,
        token
    });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if(!user) {
        return res.status(404).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token,);
    res.status(200).json({
        message: 'User logged in successfully',
        user,
        token
    });
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'User logged out successfully' });
}