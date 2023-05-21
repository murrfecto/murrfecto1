import {MongoClient, ObjectId} from "mongodb";
import {catsModel} from "../model/cats.model.js";
import sgMail from '@sendgrid/mail';

const addCat = async (req, res) => {
    const client = await MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true});
    const cats = client.db(process.env.DB_NAME).collection('cats');

    try {
        const {error} = catsModel.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const result = await cats.insertOne({...req.body, _id: new ObjectId()});
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to database');
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


const addImageToCat = async (req, res) => {
    const client = await MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true});
    const cats = client.db(process.env.DB_NAME).collection('cats');
    const cat = cats.findOne({_id: new ObjectId(req.body.id)});
    if (cat) {
        await cats.updateOne({_id: new ObjectId(req.body.id)}, {
            $set: {
                image: `http://localhost:3000/images/${req.newFileName}`
            }
        })
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
}

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
    sgMail.setApiKey(process.env.API_KEY);
    const headers = {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type2': 'application/json'
    };
    const templateId = 'd-153ab25c71df48d0b2cec989e5bfcebb';

    const msg = {
        to: email,
        from: 'murrfecto@gmail.com',
        subject: 'Support for cats!',
        templateId,
        dynamicTemplateData: {
            deliveryFrequency: 'every month'
        }
    };

    sgMail.send({...msg, headers})
        .then(() => {
            console.log('Email sent');
            res.send('Email sent');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
};


export {
    addCat, getCat, getCats, updateCatById, deleteCatById, addImageToCat, subscribeToCats
}