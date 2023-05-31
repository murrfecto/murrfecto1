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
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { upload } from './multer.config.js';
import { addReport, deleteReport } from '../controllers/report.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/cats/subscribe', subscribeToCats);
router.post('/cats/send-message', sendMessage);
router.get('/cats', getCats);
router.get('/cats/:id', getCat);
router.post('/cats', upload.array('image'), addCat);
router.delete('/cats/:id', deleteCatById);
router.put('/cats/:id', updateCatById);
router.post('/payment', sendPayment);
router.post('/payment/callback', handleCallBack);
router.post('/report', upload.single('report'), addReport);
router.delete('/report', deleteReport);

router.get('/*', (req, res) => {
	res.sendFile(
		path.join(__dirname, '..', '..', 'client', 'public', 'index.html')
	);
});

export default router;
