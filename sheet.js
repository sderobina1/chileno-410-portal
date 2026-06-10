const https = require('https');

module.exports = (req, res) => {
  const url = 'https://script.google.com/macros/s/AKfycbxVQhiYB66xSuKM_PwV3CEk2zYK4IeTUK5KA4CuRZ0UYTc8sBsdfy1rn0_nSM2n4Jbg/exec';
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  
  https.get(url, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(data);
    });
  }).on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
};
