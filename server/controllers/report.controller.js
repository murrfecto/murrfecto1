import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../helpers/connectToDb.js';
import { fileUploadModel } from '../model/report.model.js';
import { s3 } from '../routes/multer.config.js';

const addReport = async (req, res) => {
	const { client, collection } = await connectToDatabase('reports');
	console.log(req.file);
	try {
		if (!req.file) {
			return res.status(400).send('No file uploaded.');
		}
		const { originalname, location } = req.file;
		const { error, value } = fileUploadModel.validate({
			originalname,
			location,
		});
		console.log(req.body);
		console.log(value);
		if (error) {
			return res.status(400).send(error.details[0].message);
		}
		const result = await collection.insertOne(value); /*, (err, result) => {
			if (err) {
				return res.status(500).send('Failed to save file data to MongoDB.');
			}
			res.send('File uploaded and saved successfully.');
		});*/
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
	const { client, collection } = await connectToDatabase('reports');
	try {
		const result = await collection.findOne({
			_id: new ObjectId(req.params.id),
		});
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

const getReports = async (req, res) => {
	const { client, collection } = await connectToDatabase('reports');
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

const deleteReport = async (req, res) => {
	const deleteParams = {
		Bucket: 'murrfecto',
		Key: req.headers['filename'], //req.body.filename,
	};

	const deleteCommand = new DeleteObjectCommand(deleteParams);

	s3.send(deleteCommand)
		.then(() => {
			console.log('File deleted from AWS S3');
			res.sendStatus(204);
		})
		.catch((error) => {
			console.error('Error deleting file from AWS S3:', error);
			res.status(500).json({ error: 'Failed to delete the file.' });
		});
};

export { addReport, getReports, deleteReport };
