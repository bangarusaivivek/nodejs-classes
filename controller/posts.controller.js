const Posts = require('../models/posts.model');
const Comments = require('../models/comments.model')

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
};

// exports.createPost = (req,res) => {
//     const Post = new Posts();
//     const { title,desc,author,likes,comments,category,url } = req.body;

//     Post.title = title;
//     Post.desc = desc;
//     Post.likes = likes;
//     Post.author = author;
//     Post.category = category;
//     Post.url = url;

//     Post.save((err,post) => {
//         if(err){
//             return res.status(400).json({
//                 status: "failed",
//                 message: "failed to create a post",
//             })
//         }
//         return res.json(post);
//     })
// }

exports.createPost = (req,res) => {
    const Post = new Posts();
    const commentSchema = new Comments();
    const { title,desc,author,likes,comment,category,url } = req.body;
    const { user,message } = comment;

    Post.title = title;
    Post.desc = desc;
    Post.likes = likes;
    Post.author = author;
    Post.category = category;
    Post.url = url;

    commentSchema.user = user;
    commentSchema.message = message;
    
    commentSchema.save((err,result) => {
        if(err){
            return res.status(400).json({
                status: "failed",
                message: "failed to create a comment",
            })   
        }

        Post.comments = [result._id];

        Post.save((err,post) => {
            if(err){
                return res.status(400).json({
                    status: "failed",
                    message: "failed to create a post",
                })
            }
            return res.json(post);
        })  
    }) 
}

exports.updatePost = (req,res) => {
    const { title} = req.body;
    Posts.updateOne({ _id: req.params.id },{
        $set: {
            ...req.body,
        }
    })
    .exec((err,post) => {
        if(err){
            return res.status(400).json({
                status: "failed",
                message: "failed to update a post",
            })
        }
        return res.json(post);
    })

    // Posts.findByIdAndUpdate({ _id: req.params.id },{ title })
    // .exec((err,post) => {
        
    // })
}

exports.getPostsCount = (req,res) => {
    Posts.aggregate([ 
        { $match: { author: "Kathie" } },
        { $group: { _id: "$author", num_of_posts: { $sum: 1} } } ])
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({
                status: "failed",
                message: "Aggregation of posts Failed",
            })
        }
        return res.json(result); 
    })
};

exports.getLikesCount = (req,res) => {
    Posts.aggregate([ { $group: { _id: "$author", total_likes: { $sum: "$likes"} } } ])
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({
                status: "failed",
                message: "Aggregation of likes Failed",
            })
        }
        return res.json(result); 
    })
};

exports.getUrls = (req,res) => {
    Posts.aggregate([ { $group: { _id: "$author", urls: { $push: "$url"} } } ])
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({
                status: "failed",
                message: "Aggregation of pushing urls Failed",
            })
        }
        return res.json(result); 
    })
};

exports.getUniqueUrls = (req,res) => {
    Posts.aggregate([ { $group: { _id: "$author", urls: { $addToSet: "$url"} } } ])
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({
                status: "failed",
                message: "Aggregation of pushing urls Failed",
            })
        }
        return res.json(result); 
    })
};

exports.deletePost = (req,res) => {
    const { id } = req.params;
    Posts.findByIdAndDelete({ _id: id })
    .exec((err,post) => {
        if(err){
            return res.status(400).json({
                status: "failed",
                message: "failed to delete a post",
            })
        }
        return res.json(post);
    })

    // Posts.findByIdAndUpdate({ _id: req.params.id },{ title })
    // .exec((err,post) => {
        
    // })
}