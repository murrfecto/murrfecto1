import express from 'express';
import {
    addCat,
    getCat,
    getCats,
    updateCatById,
    deleteCatById,
    subscribeToCats,
    sendMessage,
    handleCallBack,
    sendPayment,
} from '../controllers/cats.controller.js';
import * as path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {upload} from './multer.config.js';
import {addReport, deleteReport} from '../controllers/report.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));


router.post("/cats/subscribe", subscribeToCats);
router.post("/cats/send-message", sendMessage);
router.get("/cats", getCats);
router.get("/cats/:id", getCat);
router.post("/cats", upload.array("image"), addCat);
router.delete("/cats/:id", deleteCatById);
router.put("/cats/:id", upload.array("image"), updateCatById);
router.post("/payment", sendPayment);
router.post("/payment/callback", handleCallBack);
router.post("/report", upload.single("report"), addReport);
router.delete("/report", deleteReport);

router.get('/*', (req, res) => {
    res.sendFile(
        path.join(__dirname, '..', '..', 'client', 'public', 'index.html')
    );
});
/**
 * @swagger
 * /cats/subscribe:
 *   post:
 *     summary: Subscribe to cats
 *     requestBody:
 *       description: Email address to subscribe
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Error sending email
 */

/**
 * @swagger
 * /cats/send-message:
 *   post:
 *     summary: Send a message
 *     requestBody:
 *       description: Message details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               text:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Error sending email
 */

/**
 * @swagger
 * /cats:
 *   get:
 *     summary: Get all cats
 *     responses:
 *       200:
 *         description: Returns an array of cats
 *       500:
 *         description: Error connecting to the database
 */

/**
 * @swagger
 * /cats/{id}:
 *   get:
 *     summary: Get a cat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *        200:
 *         description: Returns the cat with the specified ID
 *        500:
 *         description: Error connecting to the database
 */


/**
 * @swagger
 * /cats/{id}:
 *   delete:
 *     summary: Delete a cat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cat deleted successfully
 *       500:
 *         description: Error deleting document
 */

/**
 * @swagger
 * /cats/{id}:
 *   put:
 *     summary: Update a cat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated cat details
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *               description:
 *                 type: string
 *               chipped:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cat updated successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Error connecting to the database
 */

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Send a payment request
 *     requestBody:
 *       description: Payment details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               merchant_id:
 *                 type: string
 *               order_description:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the checkout URL
 *       500:
 *         description: An error occurred while processing the payment
 */

/**
 * @swagger
 * /payment/callback:
 *   post:
 *     summary: Handle payment callback
 *     requestBody:
 *       description: Payment callback details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender_email:
 *                 type: string
 *               currency:
 *                 type: string
 *               order_id:
 *                 type: string
 *               catLabel:
 *                 type: string
 *               amount:
 *                 type: string
 *               order_status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent and payment details saved successfully
 *       500:
 *         description: Error connecting to the database
 */

/**
 * @swagger
 * /report:
 *   post:
 *     summary: Add a report
 *     requestBody:
 *       description: Report file
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               report:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Report added successfully
 *       500:
 *         description: Error connecting to the database
 */

/**
 * @swagger
 * /report:
 *   delete:
 *     summary: Delete a report
 *     responses:
 *       200:
 *         description: Report deleted successfully
 */

/**
 * @swagger
 * /cats:
 *   post:
 *     summary: Add a cat
 *     requestBody:
 *       description: Cat details
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *               description:
 *                 type: string
 *               chipped:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cat added successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Error connecting to the database
 */

/**
 * @swagger
 * /cats/{id}:
 *   delete:
 *     summary: Delete a cat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cat deleted successfully
 *       500:
 *         description: Error deleting document
 */

/**
 * @swagger
 * /cats/{id}:
 *   put:
 *     summary: Update a cat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated cat details
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               chipped:
 *                 type: string
 *               gender:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cat updated successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Error connecting to the database
 */

/**
 * @swagger
 * /cats/subscribe:
 *   post:
 *     summary: Subscribe to receive updates about cats
 *     requestBody:
 *       description: Subscriber's email address
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent
 *       500:
 *         description: Error sending email
 */

/**
 * @swagger
 * /cats/send-message:
 *   post:
 *     summary: Send a message about cats
 *     requestBody:
 *       description: Message details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               text:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent
 *       500:
 *         description: Error sending email
 */

/**
 * @swagger
 * /cats:
 *   get:
 *     summary: Get all cats
 *     responses:
 *       200:
 *         description: Returns an array of cats
 *       500:
 *         description: Error connecting to the database
 */

/**
 * @swagger
 * /cats/{id}:
 *   get:
 *     summary: Get a cat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the cat with the specified ID
 *       500:
 *         description: Error connecting to the database
 */
export default router;
