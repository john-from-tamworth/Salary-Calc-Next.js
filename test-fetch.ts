import http from 'http';

console.log("Starting health check request to http://127.0.0.1:3000...");
const req = http.get("http://127.0.0.1:3000", (res) => {
  console.log(`STATUS CODE: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log(`BODY PREVIEW: ${body.slice(0, 500)}`);
  });
});

req.on('error', (err) => {
  console.error("fetch failed with error:", err.message);
});
