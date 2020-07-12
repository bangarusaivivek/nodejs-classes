const express = require('express');
const productRoutes = require('./product.routes');
const postRoutes = require('./posts.routes')
const router = express.Router();

router.use('/products',productRoutes);
router.use('/posts',postRoutes)
// router.use('/cart',cartRoutes);
// router.use('/users',userRoutes);
router.use('*',(__,res)=>{
    res.render('404',{pageTitle:"page not found"})
});
module.exports = router;