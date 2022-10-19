'use strict';
const http = require('http');
const auth = require('http-auth');
const router = require('./lib/router');

const basic = auth.basic({
  realm: 'Enter username and password.',
  file: './users.htpasswd'
});

const server = http.createServer(basic.check((req, res) => {
  //console.info('create server');
  router.route(req, res);
}))
.on('error', e => {console.error('server error', e)})
.on('clientError', e => {console.error('client error'), e});

const port = 8000;
server.listen(port, () => {
  console.info(`listening... ${port}`);
})