'use strict';
const postsHandler = require('./posts-handler');
const util = require('./handler-util')

function route(req, res){
  console.info('--- start ---');
  console.info(req.url);

  switch(req.url){
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/posts/delete':
      postsHandler.handleDelete(req, res);
      break;
    case '/logout':
      util.handleLogout(req, res);
      break;
    case '/favicon.ico':
      util.handleFavicon(req, res);
      break;
    default:
      util.handleBadRequest(req, res);
      break;
  }

  console.info('--- e n d ---');
};

module.exports = {
  route
 };