import {ObjectId} from "mongodb";
import {catsModel} from "../model/cats.model.js";
import sgMail from '@sendgrid/mail';
import crypto from "crypto";
import axios from "axios";
import {connectToDatabase} from "../helpers/connectToDb.js";
import * as fs from "fs";
import * as yup from "yup";


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

const updateCatById = async (req, res) => {
    const {client, collection} = await connectToDatabase('cats');
    const id = req.params.id;
    const filePath = "./images";
    const cat = await collection.findOne({_id: new ObjectId(id)});
    if (cat) {
        const imageUrls = cat.images;
        for (const imageUrl of imageUrls) {
            const fileName = imageUrl.split('/').pop();
            const imagePath = filePath + '/' + fileName;
            fs.unlinkSync(imagePath);
        }
        try {
            const {error} = catsModel.validate(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const images = req.files ? req.files.map((file) => `${process.env.BASE_URL}/images/${file.filename}`) : [];

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
    }
}

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
        const catId = req.params.id;
        if (!ObjectId.isValid(catId)) {
            return res.status(404).send('Invalid cat ID');
        }
        const result = await collection.findOne({_id: new ObjectId(catId)});

        if (!result) {
            return res.status(404).send('Cat not found');
        }
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    } finally {
        if (client) {
            await client.close();
        }
    }
};


const deleteCatById = async (req, res) => {
    const collectionName = 'cats';
    const id = req.params.id;
    const filePath = "./images";
    const {client, collection} = await connectToDatabase(collectionName);
    try {
        const cat = await collection.findOne({_id: new ObjectId(id)});
        if (cat) {
            const imageUrls = cat.images;
            for (const imageUrl of imageUrls) {
                const fileName = imageUrl.split('/').pop();
                const imagePath = filePath + '/' + fileName;
                fs.unlinkSync(imagePath);
            }
            const result = await collection.deleteOne({_id: new ObjectId(id)});
            res.send(result);
            // If card doesn`t have image
            if (!imageUrls) {
                const result = await collection.deleteOne({_id: new ObjectId(id)});
                res.send(result);
            }
        } else {
            res.status(404).send('Cat not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting document');
    }
    await client.close();
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

    const donationStatus = req.body.transactionStatus;

    if (donationStatus === 'Approved') {
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

        const result = await sgMail.send({...msg, headers});
        console.log('Reminder email sent successfully', result);
    } catch (error) {
        console.error('SendGrid response', error.response.body.errors);
        console.error('Error sending reminder email', error);
        throw new Error('Error sending reminder email');
    }
};


const subscribeToCats = (req, res) => {
    const {email} = req.body;
    // Define the schema for email validation using yup
    const emailSchema = yup.string().email().required();

    // Validate the email against the schema
    emailSchema
        .validate(email)
        .then(() => {
            const recipientName = email.substring(0, email.indexOf('@'));
            sgMail.setApiKey(process.env.API_KEY);
            const headers = {
                Authorization: `Bearer ${process.env.API_KEY}`,
                'Content-Type2': 'application/json',
            };
            const templateId = process.env.TEMPLATE_ID;

            const msg = {
                to: email,
                from: 'murrfecto@gmail.com',
                subject: 'Допомога котикам!',
                templateId: templateId,
                dynamicTemplateData: {
                    name: recipientName,
                    deliveryFrequency: 'every month',
                },
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
        })
        .catch(() => {
            res.status(400).send('Invalid email address');
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
    try {
        const wayForPayPass = process.env.SECRET_KEY;
        const productName = ['Допомога котикам'];
        const productCount = [1];
        const orderId = `order-${new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).replace(/\//g, '.').replace(', ', ':')}`;

        const orderBody = {
            orderReference: orderId,
            orderDate: Math.floor(Date.now() / 1000),
            merchantAccount: process.env.MERCHANT_ACCOUNT,
            merchantDomainName: process.env.MERCHANT_DOMAIN_NAME,
            productName: productName,
            productCount: productCount,
            amount: req.body.amount,
            currency: 'UAH',
        };

        const orderedKeys = [
            'merchantAccount', 'merchantDomainName', 'orderReference', 'orderDate', 'amount',
            'currency', 'productName', 'productCount'
        ];
        const signatureRaw = orderedKeys.map((key) => {
            if (Array.isArray(orderBody[key])) {
                return orderBody[key].join(';');
            }
            return orderBody[key];
        }).join(';'); // Use ';' separator as in the example

        const signatureString = `${signatureRaw};${wayForPayPass}`; // Use ';' separator
        const merchantSignature = crypto.createHmac('md5', wayForPayPass).update(signatureString).digest('hex'); // Use 'md5' algorithm

        console.log(orderBody, merchantSignature);

        const { data } = await axios.post('https://secure.wayforpay.com/pay', {
            ...orderBody,
            productPrice: [orderBody.amount],
            merchantSignature: merchantSignature,
        });

        console.log(data);

        const checkoutUrl = data.response && data.response.payment_url;
        if (checkoutUrl) {
            res.status(200).json({
                checkoutUrl,
            });
        } else {
            res.status(500).send('Unable to retrieve checkout URL from WayForPay');
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
