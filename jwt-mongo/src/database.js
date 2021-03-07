import mongoose from 'mongoose';
import { MONGODB_URI } from './config';

export const connectToDb = () => new Promise((resolve, reject) => {
	console.log('[INFO] Connecting to MongoDB...');

	return mongoose
		.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(db => {
			console.log('[INFO] Connected to MongoDB')
			resolve(db);
		})
		.catch((err) => {
			console.error('Database connection failed, retrying in 5 seconds...')
			setTimeout(() => connectToDb(), 5000);
			reject(err);
		})
});

