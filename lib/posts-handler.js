'use strict';
const pug = require('pug');
const Post = require('./post');
const util = require('./handler-util');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

async function handle(req, res){
  console.info(req.method);

  switch(req.method){
    case 'GET': // ★大文字
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });

      const posts = await Post.findAll({order:[['id', 'DESC']]});

      // 改行対応
      posts.forEach(post => {
        post.content = post.content.replace(/\n/g, '<br>');
        post.formattedCreatedAt = dayjs(post.createdAt).tz('Asia/Tokyo').format('YYYY年MM月DD日 HH時mm分ss秒');
      });

      res.end(pug.renderFile('./views/posts.pug', { posts, user: req.user })); // ★index.jsから見た時のパス
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

function handleDelete(req, res){
  console.info('delete');

  switch(req.method){
    case 'POST':
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      }).on('end', async() => {
        const params = new URLSearchParams(body);
        const id = params.get('id');
        const post = await Post.findByPk(id);

        if(req.user === post.postedBy){
          await post.destroy();
          console.info(`削除しました: ${post.id}`);
          handleRedirectPosts(req, res);
        }
      });
      break;
    default:
      util.handleBadRequest(req, res);
      break;
  }
};

module.exports = {
  handle,
  handleDelete
};