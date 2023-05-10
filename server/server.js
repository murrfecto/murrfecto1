import express from 'express';
import cors from 'cors';
import {MongoClient} from 'mongodb';
import {jsonParser, urlencodedParser} from './helpers/bodyParserMiddleware.js';
import CatsRoutes from "./routes/cats.routes.js";

//dotenv
import dotenv from 'dotenv'
dotenv.config();
// Establishing server
export const app = express();

// insert body-parser
app.use(jsonParser);
app.use(urlencodedParser);

// CORS
app.use(cors({origin: '*'}));

// images ?

// Routes
app.use(CatsRoutes)


const PORT = process.env.PORT || 8000;
// Connecting MongoDB and running server
MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log('Server listening on port 3000');
        });
    })
    .catch((err) => {
        console.error(err);
    });