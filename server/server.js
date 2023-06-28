import * as dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import {MongoClient} from 'mongodb';
import {
    jsonParser,
    urlencodedParser,
} from './helpers/bodyParserMiddleware.js';
import CatsRoutes from './routes/catsRoutes.js';
import login from './routes/loginRoutes.js'
import cookieParser from 'cookie-parser'
import {setupSwagger} from "./swagger.js";
import cron from 'node-cron'
import moment from 'moment';
import path from 'path';
import {connectToDatabase} from "./helpers/connectToDb.js";
import {sendReminderEmail} from "./controllers/cats.controller.js";

export const app = express();
// insert body-parser
app.use(jsonParser);
app.use(urlencodedParser);

//Swagger
setupSwagger(app)

// CORS
app.use(cors({origin: '*'}));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

// images
app.use('/images', express.static(path.join(process.cwd(), 'images/')));

// Routes
app.use('/api/v1', CatsRoutes);
app.use('/api/v1', login)

const PORT = process.env.PORT || 3000;
// Connecting MongoDB and running server

MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log('Server listening on port 3000');
        });
    })
    .then(async () => {
        // Create a cron job that runs every minute
        cron.schedule('0 9 1 * *', async () => {
            try {
                const {client, collection} = await connectToDatabase('donations');
                const result = await collection.find().toArray();
                // get array of docs form MongoDb
                for (const doc of result) {
                    const {orderId, senderEmail} = doc;

                    if (!orderId) {
                        console.error('orderId is undefined or null for a document', doc);
                        continue;
                    }
                    const orderDateStr = orderId.substring(orderId.indexOf('-') + 1);
                    //get order-date ( orderId substringed to dd.mm.yyyy.hh.mm )
                    const orderDate = moment(orderDateStr, 'DD.MM.YYYY:HH:mm').toDate();
                    const oneMonthAgo = moment().subtract(1, 'month').toDate();
                    //check if order date <= 1 month, if yes - we send email
                    console.log(orderDate, oneMonthAgo);
                    if (orderDate <= oneMonthAgo) {
                        if (senderEmail) {
                            await sendReminderEmail(senderEmail, orderId);
                        } else {
                            console.error('emailAddress is undefined for a document', doc);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        });
    })
    .catch((err) => {
        console.error(err);
    });

