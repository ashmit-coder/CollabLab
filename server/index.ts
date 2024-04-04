import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
const upload = multer();
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path:path.join(__dirname, "./.env")});
import apiRoutes from "./routes/api.routes";

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(upload.none());
app.use("/api",apiRoutes);

app.get('/',(_req,res)=>{
return res.json({status:true,message:"connection established"});
});


export default app;