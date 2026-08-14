const https = require('https');

function fetchUrl(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': '*/*' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) {
        return fetchUrl(res.headers.location, redirectCount + 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

module.exports = async (req, res) => {
  try {
    const url = 'https://script.google.com/macros/s/AKfycbzYkROy5gMa-x3TxVQtJT39p9okNA3mrWtXb0Xb4kO1pN2IUWxSFXiUxXmvfoWwIzLK/exec';
    const data = await fetchUrl(url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};
