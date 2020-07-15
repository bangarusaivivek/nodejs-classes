const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const v1Routes = require('./routes/v1.js');
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/blogs",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','pug');
app.set('views','views');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
    res.send("Hello Main Page")
})

app.use('/api/v1',v1Routes);



app.get('*',(__,res)=>{
    res.sendFile(path.join(__dirname,'./views/404.html'))
    // res.render('404',{pageTitle: "page not found"})
})



// app.use((req,res,next)=>{
//     console.log(req.url)
//     next();
// })
// app.use((req,res,next)=>{
//     res.send('Hello');
//     next();
// })


app.listen(PORT);