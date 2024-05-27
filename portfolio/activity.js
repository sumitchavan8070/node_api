const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../db');

router.get('/', (req, res) => {
    console.log("Received GET request");


    activityData = [
        {
            "activityType": "REACTION",
            "type": "CLAPPING",
            "count": 2,
            "createdAt": "2024-05-27T03:36:18.679Z",
            "slug": "id-tailwindcss-best-practices",
            "contentTitle": "Tailwind CSS Best Practices",
            "contentType": "POST"
        },
        {
            "activityType": "REACTION",
            "type": "CLAPPING",
            "count": 1,
            "createdAt": "2024-05-27T03:36:18.064Z",
            "slug": "id-tailwindcss-best-practices",
            "contentTitle": "Tailwind CSS Best Practices",
            "contentType": "POST"
        },
        {
            "activityType": "REACTION",
            "type": "AMAZED",
            "count": 1,
            "createdAt": "2024-05-27T03:36:17.192Z",
            "slug": "id-tailwindcss-best-practices",
            "contentTitle": "Tailwind CSS Best Practices",
            "contentType": "POST"
        },
        {
            "activityType": "REACTION",
            "type": "AMAZED",
            "count": 1,
            "createdAt": "2024-05-27T03:36:16.570Z",
            "slug": "id-tailwindcss-best-practices",
            "contentTitle": "Tailwind CSS Best Practices",
            "contentType": "POST"
        },
        {
            "activityType": "REACTION",
            "type": "AMAZED",
            "count": 1,
            "createdAt": "2024-05-27T03:36:14.411Z",
            "slug": "id-tailwindcss-best-practices",
            "contentTitle": "Tailwind CSS Best Practices",
            "contentType": "POST"
        }
]


    res.status(200).json({
      status: 1,
      response: 'data feteched  successfully.',
      data : activityData   
    });
  } );


module.exports = router;


