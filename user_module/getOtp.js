const express = require('express');
const router = express.Router();
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;

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
                pass: 'Sumit@8070' 
            }
        });

        const mailOptions = {
            from: 'sdchavan8070@gmail.com',
            to: email,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otp}`
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.response);
        res.json({
            status: 1,
            response: 'OTP sent successfully.'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            status: 0,
            response: 'Failed to send OTP'
        });
    }
});

module.exports = router;
