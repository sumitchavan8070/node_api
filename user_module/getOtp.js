const express = require('express');
const router = express.Router();
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

router.use(express.json());

router.post('/', (req, res) => {
    try {
        const { email } = req.body; // Get email from request body

        if (!email) {
            return res.status(400).json({ 
                status: 0,
                response: 'Invalid request. Email parameter is missing in the POST body.'
            });
        }

        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sdchavan8070@gmail.com',
                pass: 'sum@8070'
            }
        });

        const mailOptions = {
            from: 'sdchavan8070@gmail.com',
            to: email,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({
                    status: 0,
                    response: 'Failed to send OTP'
                });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({
                    status: 1,
                    response: 'OTP sent successfully.'
                });
            }
        });
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

module.exports = router;
