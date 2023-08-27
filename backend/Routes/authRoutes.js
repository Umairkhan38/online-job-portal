const express= require('express')
const router = express.Router();
const {signIn} = require('../Controllers/authController')

//auth routes
router.get('/',signIn);


module.exports = router;

