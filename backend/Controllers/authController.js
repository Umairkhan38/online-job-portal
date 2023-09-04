const User = require('../models/userModel')
const ErrorResponse = require('../utils/errorResponse')


exports.signUp = async(req,res,next)=>{    
    const {email} = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        return next(new ErrorResponse("email already registered!", 400))
    }
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success:true,
            user
        })  
    }
    catch(err){
        next(err);
        
    }
}

exports.signIn = async(req,res,next)=>{    
    try{
        const {email, password} = req.body;
      
        if(!email){
            return next(new ErrorResponse("email eneter an Email!", 403))
        }

        if(!password){
            return next(new ErrorResponse("email eneter a password!", 403))
        }
        
        // validation of email and password
        const user = await User.findOne({email});
        if(!user){
            
            return next(new ErrorResponse("Invalid cdredentials!", 400))
        }
        
        //Check password
        const isMatched = await user.comparePassword(password);
        
        if(!isMatched){
            return next(new ErrorResponse("Invalid cdredentials!", 400))
            
        }

        sendTokenResponse(user,200,res)

    }
    catch(err){
        next(err);
        
    }
}

const sendTokenResponse=async(user, codeStatus, res)=>{

    const token = await user.getJwtToken();
    res.status(codeStatus)
    .cookie('token', token, {maxAge:60*60*1000, httpOnly:true})
    .json({success:true, token:user})
}


//logout functionality
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}


//User Profile
exports.userProfile = async(req, res, next) => {
  const user = await User.findById(req.user.id).select('-password')
    res.status(200).json({
        success:true,
        user
    })
}