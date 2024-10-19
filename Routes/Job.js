const express = require('express');
const router = express.Router();

const {
    jobadded
} = require('../Controller/Job');

const {
    authenticateTokenAndAddCompany

}=require('../Middleware/User')



router.post('/jobadded',authenticateTokenAndAddCompany,jobadded)




module.exports = router;