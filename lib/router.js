'use strict';
const postsHandler = require('./posts-handler');

function route(req, res){
  console.info('--- start ---');
  console.info(req.url);

  switch(req.url){
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      break;
    default:
      break;
  }

  console.info('--- e n d ---');
};

module.exports = {
  route
 };