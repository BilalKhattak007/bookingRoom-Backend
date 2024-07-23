const express = require('express')
const User = require('../models/user')
const Bcrypt = require('bcrypt')
const { createError } = require('../utils/errhandle')
const jwt = require("jsonwebtoken")

//registeration:
exports.register = async(req,res,next)=>{
    try {
        const hashedPass = await Bcrypt.hash(req.body.password,14);
        const newUser = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass
        })
       res.status(200).json({
         status: 'success',
         data: { 
            newUser
          }
        });
    } catch (err) {
        next(err);
    }
}

//login:
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return next(createError(400, "User not found"));
        }
        const isPasswordCorrect = await Bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, "Incorrect Password"));
        }
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET);      
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json({
            status: 'success',
            data: { ...otherDetails }
        });
    } catch (err) {
        next(err);
    }
};