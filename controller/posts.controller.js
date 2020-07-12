const Posts = require('../models/posts.model');

exports.getAllPosts = (__,res) => {
    
    Posts.find({}).exec((err,posts) => {
        if (err)
            return res
                    .status(400)
                    .json({ status: 'failed', message: "Fetching posts from db failed" })

        return res.json(posts);
    });
};

exports.getPost = (req,res) => {
    Posts.findOne({ _id:req.params.id }).exec((err,post) => {
        if(err){
            return res
                    .status(400)
                    .json({ status: 'failed', message: "Fetching posts from db failed" })
        }
        return res.json(post);
    })
}