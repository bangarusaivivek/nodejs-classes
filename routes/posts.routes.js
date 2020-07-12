const express = require('express');
const { getAllPosts } = require('../controller/posts.controller')

const router = express.Router();

router.get('/all-posts',getAllPosts)

module.exports = router;

