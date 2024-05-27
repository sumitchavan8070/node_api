const express = require('express');
const router = express.Router();
const axios = require('axios');
const marked = require('marked');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const gistUrl = 'https://gist.githubusercontent.com/sumitchavan8070/ebd7180f6b94666d4e015f61cccd8d1c/raw/cd86302c4ce3c42c7d8bf9f55257f02525ee3071';
        
        // Fetch raw content of the Gist file using GitHub's API
        const gistResponse = await axios.get(`${gistUrl}.json`); // Append .json to the URL
        
        const gistData = gistResponse.data;

        // Find the file named "test.md" in the Gist
        const file = Object.values(gistData.files).find(file => file.filename === 'test.md');
        
        if (!file) {
            return res.status(404).json({
                status: 0,
                response: 'Markdown file not found in the Gist.'
            });
        }

        // Extract Markdown content
        const markdownContent = file.content;

        // Parse Markdown to HTML
        const htmlContent = marked(markdownContent);

        // Create JSON object
        const jsonData = {
            markdown: markdownContent,
            html: htmlContent
        };

        // Respond with JSON object
        res.status(200).json(jsonData);
    } catch (error) {
        console.error('Error fetching Markdown content:', error.message);
        // Send an informative response in case of an error
        res.status(500).json({ 
            status: 0,
            response: 'Internal server error',
            error: error.message // Include the error message for debugging purposes
        });
    }
});

module.exports = router;
