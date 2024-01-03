import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
const upload = multer();
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path:path.join(__dirname, "./.env")});
const PORT = process.env.PORT || 5000;
import apiRoutes from "./routes/api.routes";

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(upload.array("test"));
app.use("/api",apiRoutes);

app.get('/',(_req,res)=>{
return res.json({status:true,message:"connection established"});
});


app.listen(PORT,()=>{
console.log('Listening to port 5000....');
});