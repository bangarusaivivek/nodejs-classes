const express = require('express');
const path = require('path');

const router = express.Router();

const products =[
    {
        title : 'Shoe',
        description: 'Amazing shoe',
        price: '400'
    },
    {
        title : 'Jean',
        description: 'Amazing shoe',
        price: '1000'
    },
    {
        title : 'Cap',
        description: 'Amazing shoe',
        price: '500'
    }
]


router.get('/all-products',(req,res)=>{

    // res.sendFile(path.join(__dirname,'../views/products.html'))
    res.render('products',{pageTitle:"Products",products})
})
// router.get('*',(req,res)=>{

//     // res.sendFile(path.join(__dirname,'../views/products.html'))
//     res.render('404',{pageTitle:"Page not found"})
// })
module.exports = router;