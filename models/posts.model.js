const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    title: String,
    desc: String,
    author: String,
    url: String,
    category: String,
    likes: Number,
    date: {
        type: Date,
        default: Date(),
    },
    comments: [{
        user: String,
        message: String,
    }],
})

module.exports = model("posts",PostSchema);