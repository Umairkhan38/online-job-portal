const User = require('../models/userModel')
const ErrorResponse = require('../utils/errorResponse')
const nodemailer=require('nodemailer');
require ('dotenv').config();


//load all users
exports.allUsers = async (req,res,next)=>{

    //Enable Pagination
     const pageSize=10;
     const page = Number(req.query.pageNumber)||1;
     const count =  await User.find({}).estimatedDocumentCount();


    try{
        const users =await User.find().sort({createdAt: -1}).select('-passsword')
        .skip(pageSize * (page-1))
        .limit(pageSize)
        
        res.status(200).json({
            success:true,
            users,
            page,
            pages:Math.ceil(count/ pageSize),
            count
        })
        next()
    }
    catch(err){
        return next(err);
    }
}




exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}


async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    console.log("options is  ",options);
    if(quality){
        options.qaulity=quality;
    }

    options.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath,quality);

} 



//Job History
exports.createUserJobHistory = async (req, res, next) => {

    const {title, description, salary, location} = req.body;

    try {
        const currentUser = await User.findOne({_id:req.user._id});
          
        if(!currentUser){
            return next(new ErrorResponse("You must logged In",401))
        } else{
           

            const addJobHistory={
                title,
                description,
                salary,
                location,
                user:req.user._id
            }

            currentUser.jobHistory.push(addJobHistory)
            await currentUser.save();


             //transport
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let lastJob=currentUser.jobHistory[currentUser.jobHistory.length-1];
        //sending mail
        let info = await transporter.sendMail({
            from:`Umair Khan - QuickBuy.com`,
            to: req.user.email,
            subject: "Congratulations you Successfully Applied for this job !",
            html:`<h2>Hello ${req.user.firstName}!</h2> <p>You successfully Applied for a role of ${lastJob.title}! 
            we will get back to you Shortly!</p> `
        })

        }  

        res.status(200).json({
            success: true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}



exports.updateStatus=async(req,res,next)=>{

try{
    const user = await User.findById(req.body.id);
    user.jobHistory[user.jobHistory.length-1].applicationStatus = req.body.status
    user.save();

       //transport
       let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })

    let lastJob=user.jobHistory[user.jobHistory.length-1];
    //sending mail
    let info = await transporter.sendMail({
        from:`Umair Khan - QuickBuy.com`,
        to: user.email,
        subject: lastJob.applicationStatus=='accepted'?`Congratulations your Application for a role of ${lastJob.title} is Accepted !`:`oops! your application for a role of ${lastJob.title} is rejected`,
        html:lastJob.applicationStatus==='accepted' ? `<h2>Hello ${user.firstName}!</h2><p>your Application is Approved stay tuned for further details!</p>` : `<p>Best of luck! </p>`
    })

    res.status(200).json({
        success:true,
        user
    })

}catch(err){
    return next(err);
}

}

