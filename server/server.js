import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import {
	jsonParser,
	urlencodedParser,
} from './helpers/bodyParserMiddleware.js';
import CatsRoutes from './routes/cats.routes.js';
import login from './routes/login.routes.js'
import cookieParser from 'cookie-parser'


//dotenv

import path from 'path';

// Establishing server
export const app = express();

// insert body-parser
app.use(jsonParser);
app.use(urlencodedParser);

// CORS
app.use(cors({ origin: '*' }));
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
// images
app.use('/images', express.static(path.join(process.cwd(), 'images/')));
// Routes
app.use('/api/v1', CatsRoutes);
app.use('/api/v1', login)

const PORT = process.env.PORT || 8000;
// Connecting MongoDB and running server
MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database');
		app.listen(PORT, () => {
			console.log('Server listening on port 3000');
		});
	})
	.catch((err) => {
		console.error(err);
	});
