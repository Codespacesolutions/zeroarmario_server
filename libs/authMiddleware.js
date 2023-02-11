const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const {TOKEN_SECRET} = require('./libs')

exports.adminLoginJWT = asyncHandler(async(req, res, next)=>{
    let token = null
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, TOKEN_SECRET)

            req.user = await Admin.findById(decoded.id).select("-password")
            next()
        }catch(error){
            return res.status(401).json({error: "You don't have permission to access"})
        }
    }else{
        return res.status(401).send("You don't have permission to access!")
    }
})

exports.adminAuthJWT = asyncHandler(async(req, res, next)=>{
    if(req.user && req.user.isAdminActive){
        next()
    }else{
        return res.status(401).json({error: "You don't have permission to access, Not active"})
    }
})
