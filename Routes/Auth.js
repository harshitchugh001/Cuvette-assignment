const express = require('express');
const router = express.Router();

const {
    signup,
    emailotpverify,
    resendotpverify,
    login,
    loginOtpVerify,
    jugaadverify,
    tokenVerify
    
} = require('../Controller/Auth');



router.post('/signup',signup);

router.post('/verifyemail',emailotpverify);

router.post('/verifyresendotp',resendotpverify);

router.post('/login',login);


router.post('/loginverify',loginOtpVerify);

router.post('/tokenverify',tokenVerify);


router.post('/jugaad',jugaadverify);




module.exports = router;