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

        // Generate OTP as a string
        const otpString = otpGenerator.generate(6, { upperCase: false, specialChars: false });

        // Convert OTP string to integer
        const otp = parseInt(otpString);

        let account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: account.user, // Use test account username
                pass: account.pass  // Use test account password
            }
        });

        const mailOptions = {
            from: '"Sender Name" <ardella.metz@ethereal.email>', // Use a valid Ethereal email address
            to: email,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otp}`
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.response);
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info)); // Get Ethereal preview URL
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
