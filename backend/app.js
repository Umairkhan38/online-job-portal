const express=require('express')
const app=express();
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
require('dotenv').config();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const errorHandler=require('./middleware/Error')
const authRoutes = require('./Routes/authRoutes')

//error middleware
app.use(errorHandler)

//middleware
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({
    limit:'5mb',
    extended:true
}));
app.use(cors());

app.use(morgan('dev'));
app.use(cookieParser());


//port 
const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    }).then(()=>console.log("database connected successfully"))
    .catch(err=>console.log("error occurred",err));

    //routes
    app.use('/api', authRoutes);




app.listen(port,()=>{
    console.log("server is running on port : ", port);
})
