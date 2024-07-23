const express = require('express')
const jwt = require("jsonwebtoken")
const { createError } = require('../utils/errhandle')

//vertify token:
exports.verifyToken = async(req,res,next)=>{
    //checking token:
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You donot have token"))
    }
    //verifying token:
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            console.error('Token verification failed:', err); 
            return next(createError(403, "Token is invalid!"));
        }
        console.log("Decoded user:", decodedUser);
        req.user = decodedUser;
        next();
    });
}

//verify user:
exports.verifyUser = (req,res,next)=>{
    this.verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403,"Not a valid user for these actions"))
        }
    })
}


//verify Admin:
exports.verifyAdmin = (req,res,next)=>{
    this.verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403,"Not a Admin"))
        }
    })
}