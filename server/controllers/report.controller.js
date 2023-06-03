import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '../routes/multer.config.js';

const addReport = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).send('No file uploaded.');
		}

		res.sendStatus(201);
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: `Can't upload file` });
	}
};

const deleteReport = async (req, res) => {
	const deleteParams = {
		Bucket: 'murrfecto',
		Key: req.headers['filename'],
	};

	const deleteCommand = new DeleteObjectCommand(deleteParams);

	s3.send(deleteCommand)
		.then(() => {
			res.sendStatus(204);
		})
		.catch((error) => {
			console.error('Error deleting file from AWS S3:', error);
			res.status(500).json({ error: 'Failed to delete the file.' });
		});
};

export { addReport, deleteReport };
