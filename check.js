const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const { extract } = require('keyword-extractor');

// Function to escape special characters in a string
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Read the content of the text file
fs.readFile('check.txt', 'utf8', (err, dataFromFile) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Extract keywords from the text file
  const keywords = extract(dataFromFile, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
  });

  // Fetch content from the website
  axios.get('https://beta.globalassignmenthelp.com.au/thesis-statement-generator')
    .then(response => {
      const websiteHTML = response.data;
      const $ = cheerio.load(websiteHTML);
      let missingKeywords = [];

      // Extract text content from all HTML tags
      const allText = $('body').text();

      // Check if each keyword exists as a whole word in the extracted content
      keywords.forEach(keyword => {
        const escapedKeyword = escapeRegExp(keyword);
        const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi'); // Create a regular expression with word boundaries
        if (!regex.test(allText)) {
          // Add keyword to missingKeywords array
          missingKeywords.push({ keyword: keyword, reason: 'Not found on website' });
        }
      });

      if (missingKeywords.length === 0) {
        console.log('All keywords from the file are present on the website.');
      } else {
        console.log('Some keywords from the file are missing on the website:');
        // Print missing keywords in tabular format
        console.table(missingKeywords);
      }
    })
    .catch(error => {
      console.error('Error fetching website content:', error);
    });
});
