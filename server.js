const http = require('http');
const app = require('./app'); // The path to the app.js file
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});