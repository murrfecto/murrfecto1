
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

/**
 * @swagger
 * /api/v1/cats/subscribe:
 *   post:
 *     summary: Subscribe to cats
 *     description: Endpoint to subscribe to cats.
 *     responses:
 *       '200':
 *         description: Subscription successful.
 */
router.post("/cats/subscribe", subscribeToCats);

/**
 * @swagger
 * /api/v1/cats/send-message:
 *   post:
 *     summary: Send a message
 *     description: Endpoint to send a message.
 *     responses:
 *       '200':
 *         description: Message sent successfully.
 */
router.post("/cats/send-message", sendMessage);

/**
 * @swagger
 * /api/v1/cats:
 *   get:
 *     summary: Retrieve a list of cats
 *     description: Returns a list of cats
 *     responses:
 *       200:
 *         description: A list of cats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cat'
 *             example:
 *               - _id: "646c70d61df6179c6de41d3c"
 *                 name: "Костик"
 *                 description: "кіт, 6 років"
 *                 chipped: "чипований"
 *                 age: "6 років"
 *                 gender: "кіт"
 *                 images:
 *                   - "https://murrfecto.s3.eu-central-1.amazonaws.com/34243feb-c1a5-43a8-8760-626986d6596f"
 */
router.get("/cats", getCats);

/**
 * @swagger
 * /api/v1/cats/{id}:
 *   get:
 *     summary: Get a cat by ID
 *     description: Endpoint to get a cat by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cat.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cat successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cat'
 *             example:
 *               _id: "646c70d61df6179c6de41d3c"
 *               name: "Костик"
 *               description: "кіт, 6 років"
 *               chipped: "чипований"
 *               age: "6 років"
 *               gender: "кіт"
 *               images:
 *                 - "https://murrfecto.s3.eu-central-1.amazonaws.com/34243feb-c1a5-43a8-8760-626986d6596f"
 */

router.get("/cats/:id", getCat);

/**
 * @swagger
 * /api/v1/cats:
 *   post:
 *     summary: Add a new cat
 *     description: Endpoint to add a new cat.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Cat images.
 *               name:
 *                 type: string
 *                 description: Cat name.
 *               breed:
 *                 type: string
 *                 description: Cat breed.
 *               age:
 *                 type: number
 *                 description: Cat age.
 *     responses:
 *       '201':
 *         description: Cat successfully added.
 */
router.post("/cats", upload.array("image"), addCat);

/**
 * @swagger
 * /api/v1/cats/{id}:
 *   delete:
 *     summary: Delete a cat by ID
 *     description: Endpoint to delete a cat by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cat.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cat successfully deleted.
 */
router.delete("/cats/:id", deleteCatById);

/**
 * @swagger
 * /api/v1/cats/{id}:
 *   put:
 *     summary: Update a cat by ID
 *     description: Endpoint to update a cat by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cat.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Cat images.
 *               name:
 *                 type: string
 *                 description: Cat name.
 *               breed:
 *                 type: string
 *                 description: Cat breed.
 *               age:
 *                 type: number
 *                 description: Cat age.
 *     responses:
 *       '200':
 *         description: Cat successfully updated.
 */
router.put("/cats/:id", upload.array("image"), updateCatById);

/**
 * @swagger
 * /api/v1/payment:
 *   post:
 *     summary: Send a payment
 *     description: Endpoint to send a payment.
 *     responses:
 *       '200':
 *         description: Payment sent successfully.
 */
router.post("/payment", sendPayment);

/**
 * @swagger
 * /api/v1/payment/callback:
 *   post:
 *     summary: Handle payment callback
 *     description: Endpoint to handle payment callback.
 *     responses:
 *       '200':
 *         description: Payment callback handled successfully.
 */
router.post("/payment/callback", handleCallBack);

/**
 * @swagger
 * /api/v1/report:
 *   post:
 *     summary: Add a report
 *     description: Endpoint to add a report.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               report:
 *                 type: string
 *                 format: binary
 *                 description: Report file.
 *     responses:
 *       '201':
 *         description: Report successfully added.
 */
router.post("/report", upload.single("report"), addReport);

/**
 * @swagger
 * /api/v1/report:
 *   delete:
 *     summary: Delete a report
 *     description: Endpoint to delete a report.
 *     responses:
 *       '200':
 *         description: Report successfully deleted.
 */
router.delete("/report", deleteReport);

router.get('/*', (req, res) => {
    res.sendFile(
        path.join(__dirname, '..', '..', 'client', 'public', 'index.html')
    );
});

export default router;
