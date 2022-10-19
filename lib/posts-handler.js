'use strict';
const pug = require('pug');
const Post = require('./post');
const util = require('./handler-util');

async function handle(req, res){
  console.info(req.method);

  switch(req.method){
    case 'GET': // ★大文字
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });

      const posts = await Post.findAll({order:[['id', 'DESC']]});
      res.end(pug.renderFile('./views/posts.pug', { posts })); // ★index.jsから見た時のパス
      break;
    case 'POST':  // ★大文字
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      }).on('end', async () => {
        const params = new URLSearchParams(body);

        // textarea data
        const content = params.get('content');
        console.info(content);
        await Post.create({
          content,
          postedBy: req.user
        });

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