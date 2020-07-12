const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    title: String,
    desc: String,
    author: String,
    url: String,
    category: String,
    likes: Number,
    date: Date,
    comments: [Object],
})

module.exports = model("posts",PostSchema);