const express=require('express')
const app=express();
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
require('dotenv').config();
const cors=require('cors')

//port 
const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindANdModify:false
    }).then(()=>console.log("database connected successfully"))
    .catch(err=>console.log("error occurred",err));
    

app.listen(port,()=>{
    console.log("server is running on port : ", port);
})
