import dotenv from 'dotenv';dotenv.config();
import express from 'express';import cors from 'cors';import morgan from 'morgan';
import connectDB from './utils/db.js';import routes from './routes.js';
const app=express();app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));app.use(express.json({limit:'1mb'}));app.use(morgan('dev'));
app.get('/api/health',(_req,res)=>res.json({status:'ok',service:'Onboardly API'}));app.use('/api',routes);
app.use((err,_req,res,_next)=>{console.error(err);if(err.name==='MulterError')return res.status(400).json({message:err.message});res.status(err.status||500).json({message:err.message||'Server error'});});
const port=process.env.PORT||5000;connectDB().then(()=>app.listen(port,()=>console.log(`Onboardly API running at http://localhost:${port}`))).catch(e=>{console.error(e);process.exit(1)});
