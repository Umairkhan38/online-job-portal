const express= require('express')
const router = express.Router();
const {signIn,signUp, logout} = require('../Controllers/authController')

//auth routes
router.get('/signin',signIn);

router.post('/signup',signUp);

router.get('/logout',logout)

module.exports = router;

