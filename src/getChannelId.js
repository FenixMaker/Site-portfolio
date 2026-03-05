const https = require('https');
https.get('https://www.youtube.com/@FenixPosts', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/"channelId":"([^"]+)"/);
    console.log(match ? match[1] : 'Not found');
  });
});
