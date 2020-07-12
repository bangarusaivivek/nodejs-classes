const express = require('express');
const { getAllPosts, getPost } = require('../controller/posts.controller')

const router = express.Router();

router.get('/all-posts',getAllPosts);

router.get("/post/:id",getPost);

module.exports = router;

