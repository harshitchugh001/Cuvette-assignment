// const crypto = require('crypto');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const Company = require('../Model/Company');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = async (req, res) => {
    console.log(req.body, "body ");
    const { name, companyname, email, phonenumber, employeesize } = req.body;

    try {
        const existingUser = await Company.findOne({ email });
        if (existingUser) {
            if (existingUser.isEmailVerified) {
                return res.status(400).json({
                    error: 'Email is already taken',
                });
            } else {
                existingUser.name = name;
                existingUser.companyname = companyname;
                existingUser.phonenumber = phonenumber;
                existingUser.employeesize = employeesize;

                existingUser.emailotp = Math.floor(100000 + Math.random() * 900000).toString();
                existingUser.numberotp = Math.floor(100000 + Math.random() * 900000).toString();
                existingUser.otpExpiry = Date.now() + 10 * 60 * 1000;

                const user = await existingUser.save();

                const emailData = {
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: `Account Activation OTP`,
                    html: `
                        <h1>Your new OTP for account activation is: ${existingUser.emailotp}</h1>
                        <p>This OTP will expire in 10 minutes.</p>
                        <hr />
                        <p>If you didn't request this, please ignore this email.</p>
                    `,
                };

                await sgMail.send(emailData);

                return res.json({
                    message: `An OTP has been sent to ${email} for account activation.`,
                    user:user
                });
            }
        }

        const existingPhone = await Company.findOne({ phonenumber, isPhoneVerified: true });
        if (existingPhone) {
            return res.status(400).json({
                error: 'Phone number is already taken',
            });
        }

        const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const phoneOtp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpExpiry = Date.now() + 10 * 60 * 1000;
        const timestamp = Date.now().toString();
        const randomNum = Math.floor(Math.random() * 10000).toString();
        const uniqueId = `${timestamp}${randomNum}`;

        const newUser = new Company({
            name,
            companyname,
            email,
            phonenumber,
            employeesize,
            userid: uniqueId,
            emailotp: emailOtp,
            numberotp: phoneOtp,
            isEmailVerified: false,
            isPhoneVerified: false,
            otpExpiry,
        });

        await newUser.save();

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account Activation OTP`,
            html: `
                <h1>Your OTP for account activation is: ${emailOtp}</h1>
                <p>This OTP will expire in 10 minutes.</p>
                <hr />
                <p>If you didn't request this, please ignore this email.</p>
            `,
        };

        await sgMail.send(emailData);

        return res.json({
            message: `An OTP has been sent to ${email} and your phone number. Please check to activate your account.`,
            user:newUser
        });
    } catch (error) {
        console.error('SIGNUP ERROR:', error);
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.',
        });
    }
};



exports.emailotpverify = async (req, res) => {
    const { email, emailotp, numberotp } = req.body;

    try {
        const user = await Company.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
        }

        let emailVerified =user.isEmailVerified;
        let phoneVerified =user.isPhoneVerified;

        
        if ( numberotp) {
            const receivedOtpNumber = parseInt(numberotp.trim(), 10);
            if (user.numberotp === receivedOtpNumber) {
                user.isPhoneVerified = true; 
                user.numberotp = null; 
                phoneVerified = true; 
                await user.save();
            } else {
                return res.status(400).json({ error: 'Invalid phone number OTP. Please try again.' });
            }
        }

       
        if (email && emailotp) {
            const receivedOtpEmail = parseInt(emailotp.trim(), 10);
            if (user.emailotp === receivedOtpEmail) {
                user.isEmailVerified = true; 
                user.emailotp = null; 
                emailVerified = true; 
                await user.save();
            } else {
                return res.status(400).json({ error: 'Invalid email OTP. Please try again.' });
            }
        }

        
        if (emailVerified && phoneVerified) {
            const token = jwt.sign(
                { userid: user.userid },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.json({
                // message: 'Verification successful!',
                emailverified:emailVerified,
                phoneverified:phoneVerified,
                token: token,
            });
        }
        else{
            return res.json({
                // message: 'Verification successful! go for another',
                emailverified:emailVerified,
                phoneverified:phoneVerified,
                // token: token,
            });


        }

    } catch (error) {
        console.error('EMAIL OTP VERIFY ERROR:', error);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};


exports.resendotpverify = async (req, res) => {
    const { email } = req.body;

    try {
        
        const user = await Company.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Email not found. Please register first.' });
        }

        const newEmailOtp = Math.floor(100000 + Math.random() * 900000).toString();

        const newOtpExpiryTime = Date.now() + 10 * 60 * 1000;

        user.emailotp = newEmailOtp;
        user.otpExpiryTime = new Date(newOtpExpiryTime);

        await user.save();

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Resend OTP for Account Activation`,
            html: `
                <h1>Your new OTP for account activation is: ${newEmailOtp}</h1>
                <p>This OTP will expire in 10 minutes.</p>
                <hr />
                <p>If you didn't request this, please ignore this email.</p>
            `,
        };

        await sgMail.send(emailData);

        return res.status(200).json({
            message: `A new OTP has been sent to ${email}. Please check your email to verify your account.`,
        });
    } catch (error) {
        console.error('RESEND OTP ERROR:', error);
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.',
        });
    }
};

exports.login = async (req, res) => {
    const { identifier } = req.body;

    try {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const query = isEmail ? { email: identifier } : { phonenumber: identifier };

        const user = await Company.findOne(query);

        if (!user) {
            return res.status(404).json({ error: 'User not found. Please sign up first.' });
        }

        const newEmailOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const newOtpExpiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.emailotp = newEmailOtp;
        user.otpExpiryTime = new Date(newOtpExpiryTime);

        await user.save();

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: `Login OTP`,
            html: `
                <h1>Your OTP for login is: ${newEmailOtp}</h1>
                <p>This OTP will expire in 10 minutes.</p>
                <hr />
                <p>If you didn't request this, please ignore this email.</p>
            `,
        };

        await sgMail.send(emailData);

        return res.status(200).json({
            message: `An OTP has been sent to your registered email address. Please check to log in.`,
        });
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.',
        });
    }
};


exports.loginOtpVerify = async (req, res) => {
    const { identifier, otp } = req.body;

    try {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const query = isEmail ? { email: identifier } : { phonenumber: identifier };

        const user = await Company.findOne(query);

        if (!user) {
            return res.status(404).json({ error: 'User not found. Please sign up first.' });
        }

        if (user.emailotp.toString() !== otp.trim()) {
            return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
        }

        if (Date.now() > new Date(user.otpExpiryTime).getTime()) {
            return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
        }

        const token = jwt.sign(
            { userid: user.userid },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        return res.status(200).json({
            message: 'OTP verified successfully.',
            token: token,
        });
    } catch (error) {
        console.error('OTP VERIFY ERROR:', error);
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.',
        });
    }
};


exports.jugaadverify = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Company.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found. Please register first.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('JUGAAD VERIFY ERROR:', error);

        return res.status(500).json({
            error: 'Something went wrong. Please try again later.',
        });
    }
};




