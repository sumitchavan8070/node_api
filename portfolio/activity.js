const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../db');

router.get('/', (req, res) => {
    console.log("Received GET request");


    // Your specific data
    const activityData = [
     
     
    {
      "activityType": "REACTION",
      "type": "CLAPPING",
      "count": 2,
      "createdAt": "2024-05-27T03:36:18.679Z",
      "slug": "Flutter Project",
      "contentTitle": "Animated Drawer",
      "contentType": "POST", 
      "redirectUrl": "https://github.com/sumitchavan8070/drawer_flutter"
    },

    {
      "activityType": "REACTION",
      "type": "CLAPPING",
      "count": 1,
      "createdAt": "2024-05-27T03:36:18.064Z",
      "slug": "Node  Project",
      "contentTitle": "Car-Bikes",
      "contentType": "POST",
      "redirectUrl": "https://github.com/sumitchavan8070/node_api"

    },
    {
      "activityType": "REACTION",
      "type": "AMAZED",
      "count": 1,
      "createdAt": "2024-05-27T03:36:17.192Z",
      "slug": "id-tailwindcss-best-practices",
      "contentTitle": "Tailwind CSS Best Practices",
      "contentType": "POST",
      "redirectUrl": "https://github.com/sumitchavan8070/drawer_flutter"

    },
    {
      "activityType": "REACTION",
      "type": "AMAZED",
      "count": 1,
      "createdAt": "2024-05-27T03:36:16.570Z",
      "slug": "id-tailwindcss-best-practices",
      "contentTitle": "Tailwind CSS Best Practices",
      "contentType": "POST",
      "redirectUrl": "https://github.com/sumitchavan8070/drawer_flutter"

      

    },
    {
      "activityType": "REACTION",
      "type": "AMAZED",
      "count": 1,
      "createdAt": "2024-05-27T03:36:14.411Z",
      "slug": "id-tailwindcss-best-practices",
      "contentTitle": "Tailwind CSS Best Practices",
      "contentType": "POST",
      "redirectUrl": "https://github.com/sumitchavan8070/drawer_flutter"

    }
    ];

    // Return the specific data
    res.status(200).json(
        activityData
    );
});

module.exports = router;
