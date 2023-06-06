require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validateToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY)
        return data
    } catch (error) {
        throw new Error('Invalid cookie token!')
    }
}
const createAccessToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    }
    const cookie = jwt.sign(payload, process.env.SECRET_KEY)
    return {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        cookie
    };
}

const register = async(data) => {
    const existingEmail = await User.findOne({email: data.email})
    const existingUsername = await User.findOne({username: data.username})

    if(existingEmail){
        throw new Error('Email already exists!')
    }else if(existingUsername){
        throw new Error('Username already exists!')
    }
    const user = await User.create(data)
    return createAccessToken(user)
}

module.exports = {
    register,
    validateToken,
    createAccessToken,
}