const JobType = require('../models/jobTypeModel')
const ErrorResponse = require('../utils/errorResponse')


//create a job category
exports.createJobType = async (req,res,next)=>{

    try{
        const job = await JobType.create({
            jobTypeName:req.body.jobTypeName,
            user:req.user.id
        })

        res.status(201).json({
            success:true,
            job
        })
    }
    catch(err){
        next(err)
    }

}

//Get All job categories
exports.allJobType = async (req,res,next)=>{

    try{
        const job = await JobType.find();
        res.status(200).json({
            success:true,
            job
        })
    }
    catch(err){
        next(err)
    }

}