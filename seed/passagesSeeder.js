import dotenv     from 'dotenv';
import mongoose   from 'mongoose';
import fs         from 'fs';
import ReadingPassage from '../models/ReadingPassage.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const data = JSON.parse(fs.readFileSync(new URL('./defaultPassages.json', import.meta.url)));

await ReadingPassage.deleteMany({ userId: null });   // clear old global seed
await ReadingPassage.insertMany(data);

console.log('✅ Default passages seeded');
process.exit();
