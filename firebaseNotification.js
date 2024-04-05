const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const sendPushNotification = require('./path/to/sendPushNotification'); 

const serviceAccount = require('./path/to/your/serviceAccountKey.json');
const fcmServerKey = 'your_fcm_server_key_here';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    apiKey: fcmServerKey
});

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const { id, topic, token, title, body, data } = req.body;

        if (!id) {
            return res.status(400).json({ 
                status: 0,
                response: 'Invalid request. ID parameter is missing in the POST body.'
            });
        }

        const message = {
            notification: {
                title: title || 'New Furniture Item Added',
                body: body || `A new furniture item has been added with ID: ${id}`
            },
            data: data || {},
            topic: topic || 'furniture_updates',
            token: token
        };

        try {
            await sendPushNotification({ to: token, title, body, data });
            console.log('Successfully sent FCM message');
            res.json({
                status: 1,
                response: 'FCM notification sent successfully.'
            });
        } catch (error) {
            console.error('Error sending FCM message:', error);
            return res.status(500).json({ 
                status: 0,
                response: 'Error sending FCM message.'
            });
        }
    } catch (error) {
        console.error('Error in post API:', error.message);
        res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

module.exports = router;
