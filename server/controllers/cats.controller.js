import {MongoClient, ObjectId} from "mongodb";
import {catsModel} from "../model/cats.model.js";
import sgMail from '@sendgrid/mail';
import crypto from "crypto";
import axios from "axios";

const addCat = async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    const client = await MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true});
    const cats = client.db(process.env.DB_NAME).collection('cats');
    try {
        const {error} = catsModel.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const images = req.files.map((file) => file.location);

        const result = await cats.insertOne({
            ...req.body, _id: new ObjectId(), images: images,
        });

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    } finally {
        await client.close();
    }
};

const getCats = async (req, res) => {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true});
        const cats = client.db(process.env.DB_NAME).collection('cats');
        const result = await cats.find({}).toArray();
        res.send(result);
        await client.close();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to database');
    }
};

const getCat = async (req, res) => {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true});
        const cats = client.db(process.env.DB_NAME).collection('cats');
        const result = await cats.findOne({_id: new ObjectId(req.params.id)});
        res.send(result);
        await client.close();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to database');
    }
};

const deleteCatById = async (req, res) => {
    const client = await MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true});
    const db = client.db(process.env.DB_NAME);
    const collectionName = 'cats';
    const id = req.params.id;

    try {
        const result = await db.collection(collectionName).deleteOne({_id: new ObjectId(id)});
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting document');
    }
    await client.close();
};

const updateCatById = async (req, res) => {
    const client = await MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true});
    const db = client.db(process.env.DB_NAME);
    const collectionName = 'cats';
    const id = req.params.id;
    const newCat = req.body;
    try {
        const result = await db.collection(collectionName).updateOne({_id: new ObjectId(id)}, {$set: newCat});
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating document');
    }
    await client.close();
};

const subscribeToCats = (req, res) => {
    const {email} = req.body;
    const recipientName = email.substring(0, email.indexOf('@'));
    sgMail.setApiKey(process.env.API_KEY);
    const headers = {
        Authorization: `Bearer ${process.env.API_KEY}`, 'Content-Type2': 'application/json'
    };
    const templateId = process.env.TEMPLATE_ID;

    const msg = {
        to: email,
        from: 'murrfecto@gmail.com',
        subject: 'Допомога котикам!',
        templateId: templateId,
        dynamicTemplateData: {
            name: recipientName, deliveryFrequency: 'every month'
        }
    };

    sgMail.send({...msg, headers})
        .then(() => {
            res.send('Email sent');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
};

const sendMessage = (req, res) => {
    const {email, text, name} = req.body;
    sgMail.setApiKey(process.env.API_KEY);
    const headers = {
        Authorization: `Bearer ${process.env.API_KEY}`, 'x-custom-content-type': 'application/json',
    };
    const msg = {
        to: 'murrfecto@gmail.com', from: email, subject: `Message from ${name}`, text: text,
    };
    sgMail
        .send({...msg, headers})
        .then(() => {
            res.send('Email sent');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
};


const sendPayment = async (req, res) => {
    const fondyPassword = 'test';
    const orderBody = {
        order_id: `pizzastack_first_order_${Date.now()}`,
        merchant_id: '1396424',
        order_desc: 'Піца техас x2, Coca-Cola 2л x1',
        amount: 52500,
        currency: 'UAH',
    };
    const orderedKeys = Object.keys(orderBody).sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    const signatureRaw = orderedKeys.map((key) => orderBody[key]).join('|');
    const signatureString = `${fondyPassword}|${signatureRaw}`;
    const signature = crypto.createHash('sha1').update(signatureString)
    try {
        const {data} = await axios.post('https://pay.fondy.eu/api/checkout/url/', {
            request: {
                ...orderBody,
                signature: signature.digest('hex')
            },
        });
        const checkoutUrl = data.response && data.response.checkout_url;
        if (checkoutUrl) {
            res.status(200).json({
                checkoutUrl
            })
        } else {
            res.status(500).send('Unable to retrieve checkout URL');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the payment');
    }
};


export {
    addCat, getCat, getCats, updateCatById, deleteCatById, subscribeToCats, sendMessage, sendPayment
}
