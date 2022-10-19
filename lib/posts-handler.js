'use strict';
const pug = require('pug');
const util = require('./handler-util');

const contents = [];

function handle(req, res){
  console.info(req.method);

  switch(req.method){
    case 'GET': // ★大文字
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(pug.renderFile('./views/posts.pug', { contents })); // ★index.jsから見た時のパス
      break;
    case 'POST':  // ★大文字
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      }).on('end', () => {
        const params = new URLSearchParams(body);

        // textarea data
        const content = params.get('content');
        console.info(content);
        contents.push(content);

        // redirect
        handleRedirectPosts(req, res);
      });
      break;
    default:
      util.handleBadRequest(req, res);
      break;
  }
};

function handleRedirectPosts(req, res){
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
};

module.exports = {
  handle
};