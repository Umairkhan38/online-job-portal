const express = require('express');
const router = express.Router();
const {createJobType, allJobType} = require('../Controllers/jobTypeController');
const {isAuthenticated} = require('../middleware/auth')


// api/type/create
router.post('/type/create',isAuthenticated,createJobType);

//api/type/jobs
router.get('/type/jobs',allJobType);



module.exports = router;
