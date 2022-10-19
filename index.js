'use strict';
const http = require('http');
const router = require('./lib/router');

const server = http.createServer((req, res) => {
  //console.info('create server');
  router.route(req, res);
})
.on('error', e => {console.error('server error', e)})
.on('clientError', e => {console.error('client error'), e});

const port = 8000;
server.listen(port, () => {
  console.info(`listening... ${port}`);
})