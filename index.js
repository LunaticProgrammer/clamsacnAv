const express = require('express');
const fileupload = require('express-fileupload');
const {config,engine} = require('express-edge');
const bodyParser = require('body-parser');
const path = require('path');
const handleUplod = require('./controllers/uploadHandler');


config({cache: process.env.NODE_ENV==='production'})
const app = express();

app.use(engine);
app.set('views',`${__dirname}/views`);
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileupload())

app.get('/',(req,res)=>{

    res.render('home');
})

app.post('/upload',handleUplod);



app.listen(3000, ()=>{

    console.log("listening on port 3000")
})