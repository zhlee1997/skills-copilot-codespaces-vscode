// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const comments = require('./comments');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/comments') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments.getComments()));
  } else if (req.method === 'POST' && req.url === '/comments') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const comment = JSON.parse(body);
      comments.addComment(comment);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comments.getComments()));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});