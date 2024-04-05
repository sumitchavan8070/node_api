const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.use(express.json());

const serviceAccount = require('/home/user/Documents/project-store-f2e87-firebase-adminsdk-gg91n-8623285c8a.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.post('/', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        status: 0,
        response: 'Invalid request. phoneNumber parameter is missing in the POST body.',
      });
    }
    const formattedPhoneNumber = '+91' + phoneNumber;
    const user = await admin.auth().phoneNumber.serviceAccount({
        
      phoneNumber: formattedPhoneNumber,
    });

    console.log('OTP sent to', formattedPhoneNumber); // Logging the phone number
    res.status(200).json({
      status: 1,
      response: 'OTP sent successfully.',
      uid: user.uid,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      status: 0,
      response: 'Failed to send OTP',
      error: error.message,
    });
  }
});

module.exports = router;
