const express = require('express');
const { getAllPosts, getPost, createPost } = require('../controller/posts.controller')

const router = express.Router();

router.get('/all-posts',getAllPosts);

router.get('/post/:id',getPost);

router.post('/add-post',createPost)

module.exports = router;

