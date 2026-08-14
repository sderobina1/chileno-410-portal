const https = require('https');

module.exports = (req, res) => {
  const url = 'https://script.google.com/macros/s/AKfycbzYkROy5gMa-x3TxVQtJT39p9okNA3mrWtXb0Xb4kO1pN2IUWxSFXiUxXmvfoWwIzLK/exec';
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
    if (response.statusCode === 302 || response.statusCode === 301) {
      https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
        let data = '';
        res2.on('data', chunk => data += chunk);
        res2.on('end', () => { res.setHeader('Content-Type', 'text/plain'); res.status(200).send(data); });
      }).on('error', err => res.status(500).send(err.message));
    } else {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => { res.setHeader('Content-Type', 'text/plain'); res.status(200).send(data); });
    }
  }).on('error', err => res.status(500).json({ error: err.message }));
};
