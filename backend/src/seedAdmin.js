import dotenv from 'dotenv';dotenv.config();import bcrypt from 'bcryptjs';import connectDB from './utils/db.js';import {User,Department} from './models/index.js';
await connectDB();const email=process.env.ADMIN_EMAIL||'admin@onboardly.local';const password=process.env.ADMIN_PASSWORD||'Admin@12345';
if(!await User.findOne({email}))await User.create({name:'Onboardly Admin',email,password:await bcrypt.hash(password,12),role:'admin'});
for(const name of ['Engineering','Human Resources','Finance','Marketing','Operations'])await Department.updateOne({name},{$setOnInsert:{name}},{upsert:true});
console.log(`Seed complete. Admin: ${email}. Keep demo credentials local only.`);process.exit(0);
