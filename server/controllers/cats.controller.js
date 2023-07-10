import {ObjectId} from "mongodb";
import {catsModel} from "../model/cats.model.js";
import sgMail from '@sendgrid/mail';
import crypto from "crypto";
import axios from "axios";
import {connectToDatabase} from "../helpers/connectToDb.js";
import path from "path";
import * as fs from "fs";


const addCat = async (req, res) => {
    const {client, collection} = await connectToDatabase('cats');
    try {
        console.log(req.files)
        const {error} = catsModel.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const images = req.files.map((file) => `${process.env.BASE_URL}/images/${file.filename}`);
        const result = await collection.insertOne({
            ...req.body,
            _id: new ObjectId(),
            images: images,
        });
        res.send(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error connecting to the database');
    } finally {
        if (client) {
            await client.close();
        }
    }
};


const getCats = async (req, res) => {
    const {client, collection} = await connectToDatabase('cats');
    try {
        const result = await collection.find({}).toArray();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const getCat = async (req, res) => {
    const {client, collection} = await connectToDatabase('cats');
    try {
        const result = await collection.findOne({_id: new ObjectId(req.params.id)});
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    } finally {
        if (client) {
            await client.close();
        }
    }
};


const deleteCatById = async (req, res) => {
    const collectionName = 'cats';
    const id = req.params.id;
    const {client, collection} = await connectToDatabase(collectionName);
    try {
        // Find the document to be deleted
        const cat = await collection.findOne({ _id: new ObjectId(id) });

        // Delete the corresponding image file
        const imageFileName = cat.imageFileName;
        const imagePath = path.join(__dirname, 'images', imageFileName); // Adjust the path to your image directory
        fs.unlinkSync(imagePath); // Delete the file

        // Delete the document from the collection
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting document');
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const updateCatById = async (req, res) => {
    const {client, collection} = await connectToDatabase('cats');
    try {
        const {error} = catsModel.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const id = req.params.id;

        const images = req.files ? req.files.map((file) => file.location) : [];

        const result = await collection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    ...req.body,
                    images: images,
                },
            }
        );
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    } finally {
        if (client) {
            await client.close();
        }
    }
};


const handleCallBack = async (req, res) => {
    const collectionName = 'donations';
    const {client, collection} = await connectToDatabase(collectionName);
    const senderEmail = req.body.sender_email;
    const currency = req.body.currency;
    const orderId = req.body.order_id;
    const catName = req.body.catLabel;
    const rawAmount = parseFloat(req.body.amount) / 100;
    const amount = new Intl.NumberFormat('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(rawAmount).replace('.', ',')

    const donationStatus = req.body.order_status;

    if (donationStatus === 'approved') {
        try {
            sgMail.setApiKey(process.env.API_KEY);
            const headers = {
                Authorization: `Bearer ${process.env.API_KEY}`, 'Content-Type2': 'application/json'
            };
            const templateId = process.env.TEMPLATE_ID_AFTER_PAYMENT;

            const msg = {
                to: senderEmail,
                from: 'murrfecto@gmail.com',
                subject: 'Допомога котикам!',
                templateId: templateId,
                dynamicTemplateData: {
                    deliveryFrequency: 'once',
                    catName: catName,
                }
            };

            await sgMail.send({...msg, headers});
            const result = await collection.insertOne({senderEmail, orderId, amount, currency});
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error connecting to the database');
        } finally {
            if (client) {
                await client.close();
            }
        }
    }
};

const sendReminderEmail = async (recipientEmail, orderId) => {
    try {
        const recipientName = recipientEmail.substring(0, recipientEmail.indexOf('@'));
        sgMail.setApiKey(process.env.API_KEY);
        const headers = {
            Authorization: `Bearer ${process.env.API_KEY}`,
            'x-custom-content-type': 'application/json'
        };
        const templateId = process.env.TEMPLATE_ID_REMINDER;

        const msg = {
            to: recipientEmail,
            from: 'murrfecto@gmail.com',
            subject: 'Payment Reminder',
            templateId: templateId,
            dynamicTemplateData: {
                name: recipientName,
                reminderDate: new Date().toLocaleDateString('en-US'),
                orderId: orderId
            }
        };

        const result = await sgMail.send({ ...msg, headers });
        console.log('Reminder email sent successfully', result);
    } catch (error) {
        console.error('SendGrid response', error.response.body.errors);
        console.error('Error sending reminder email', error);
        throw new Error('Error sending reminder email');
    }
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
    // const headers = {
    //     Authorization: `Bearer ${process.env.API_KEY}`, 'x-custom-content-type': 'application/json',
    // };
    const msg = {
        to: 'murrfecto@gmail.com', from: email, subject: `Message from ${name}`, text: text,
    };
    sgMail
        .send(msg)
        .then(() => {
            res.send('Email sent');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
};


const sendPayment = async (req, res) => {
    const fondyPassword = 'UMlmJSsXiLLDcVLxAMwhlS69A1GbBEq2';
    const orderId = `order-${new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).replace(/\//g, '.').replace(', ', ':')}`;

    const orderBody = {
        order_id: orderId,
        merchant_id: '1525375',
        order_desc: 'Допомога котикам',
        amount: req.body.amount,
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
            res.status(500).send('Unable to retrieve checkout URL from SendGrid');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the payment');
    }
};


export {
    addCat,
    getCat,
    getCats,
    updateCatById,
    deleteCatById,
    subscribeToCats,
    sendMessage,
    sendPayment,
    handleCallBack,
    sendReminderEmail
}
