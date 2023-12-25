const express = require('express');
const app = express();
const morgan  = require('morgan');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
require('dotenv').config()
const PORT = process.env.PORT || 5000;

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(upload.array());

app.get('/',(req:never,res:any)=>{
res.json({status:true,message:"connection established"});
});


app.listen(PORT,()=>{
console.log('Listening to port 5000....');
});