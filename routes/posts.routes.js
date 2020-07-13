const express = require('express');
const { getAllPosts, getPost, createPost, updatePost, getPostsCount, getLikesCount, getUniqueUrls, getUrls, deletePost } = require('../controller/posts.controller')

const router = express.Router();

router.get('/all-posts',getAllPosts);

router.get('/post/:id',getPost);

router.post('/add-post',createPost);

router.put('/update-post/:id',updatePost);

router.get('/posts-count-per-author',getPostsCount);

router.get('/likes-count-per-author',getLikesCount);

router.get('/urls-per-author',getUrls);

router.get('/unique-urls-per-author',getUniqueUrls);

router.delete('/delete-post/:id',deletePost);

module.exports = router;

