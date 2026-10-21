import jwt from 'jsonwebtoken';
import {User} from '../models/index.js';
export async function protect(req,res,next){try{const h=req.headers.authorization||'';const token=h.startsWith('Bearer ')?h.slice(7):null;if(!token)return res.status(401).json({message:'Authentication required'});const p=jwt.verify(token,process.env.JWT_SECRET);const user=await User.findById(p.id);if(!user||!user.active)return res.status(401).json({message:'Account unavailable'});req.user=user;next();}catch{return res.status(401).json({message:'Invalid or expired token'});}}
export const roles=(...allowed)=>(req,res,next)=>allowed.includes(req.user?.role)?next():res.status(403).json({message:'Permission denied'});
export async function notify(recipient,title,message,kind='info'){const {Notification}=await import('../models/index.js');if(recipient)await Notification.create({recipient,title,message,kind});}
