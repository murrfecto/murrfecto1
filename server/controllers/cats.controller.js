import {MongoClient, ObjectId} from "mongodb";
import {catsModel} from "../model/cats.model.js";
import sgMail from '@sendgrid/mail';

const addCat = async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    const client = await MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true});
    const cats = client.db(process.env.DB_NAME).collection('cats');
    try {
        const { error } = catsModel.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const images = req.files.map((file) => file.location);

        const result = await cats.insertOne({
            ...req.body,
            _id: new ObjectId(),
            images: images,
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
        const result = await cats.findOne({})
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
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type2': 'application/json'
    };
    const templateId = process.env.TEMPLATE_ID;

    const msg = {
        to: email,
        from: 'murrfecto@gmail.com',
        subject: 'Допомога котикам!',
        templateId: templateId,
        dynamicTemplateData: {
            name: recipientName,
            deliveryFrequency: 'every month'
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


export {
    addCat, getCat, getCats, updateCatById, deleteCatById, subscribeToCats
}