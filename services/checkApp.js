const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Received GET request");

    // Extract package name from the URL
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.globalassignmenthelp&hl=en_IN&gl=US';
    const packageNameMatch = playStoreUrl.match(/id=([^&]+)/);
    const packageName = packageNameMatch ? packageNameMatch[1] : null;

    const appScheme = "example"; // Replace "example" with your actual app scheme

    console.log("Package Name:", packageName); // Log the extracted package name
    console.log("App Scheme:", appScheme); // Log the static app scheme

    if (!packageName || !appScheme) {
        console.log("Invalid request. Package name or app scheme is missing."); // Log if request is invalid
        return res.status(400).json({
            status: 0,
            response: 'Invalid request. Package name or app scheme is missing.'
        });
    }

    // Construct intent URL
    const intentUrl = `${appScheme}://${packageName}`;

    console.log("Intent URL:", intentUrl); // Log the intent URL

    // Attempt to open the app using the custom URL scheme
    res.redirect(intentUrl);

    // Set a timeout to redirect to the Play Store if the app is not opened within a certain time
    setTimeout(() => {
        res.redirect(playStoreUrl);
    }, 5000); // Adjust the timeout value as needed
});

module.exports = router;
