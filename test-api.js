const http = require('http');
http.get('http://localhost:3001/api/commerce/products?categoryName=tees', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    console.log("Body:", data.slice(0, 200));
  });
}).on('error', (err) => {
  console.log("Error:", err.message);
});
