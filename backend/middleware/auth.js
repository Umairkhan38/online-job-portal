const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies
    
    //Make sure User Exist
    if(!token){
        return next(new ErrorResponse("User is not Authorized !",401))
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decode.id);
        next();

    }   
    catch(err){
        return next(new ErrorResponse("User is not Authorized !",401));
    }


}

//Middleware for admin
exports.isAdmin=(req, res , next)=>{
    if(req.user.role === 0)
        return next(new ErrorResponse("Access Denied you Must be admin !",401));
    next();    
}