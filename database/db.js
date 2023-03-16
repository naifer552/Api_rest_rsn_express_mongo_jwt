import 'dotenv/config';
import mongoose, { connect } from 'mongoose';

const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_DB = process.env.MONGODB_DATABASE;
const MONGO_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DB}`;

try {
    await mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URI, {});
} catch (error) {
    console.log(error);
    
}