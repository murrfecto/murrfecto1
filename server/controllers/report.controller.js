import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../helpers/connectToDb.js';
import { fileUploadModel } from '../model/report.model.js';

const addReport3 = async (req, res) => {
	const { client, collection } = await connectToDatabase('reports');
	try {
		const { error } = fileUploadModel.validate(req.body);

		if (error) {
			return res.status(400).send(error.details[0].message);
		}

		const images = req.files.map((file) => file.location);
		const result = await collection.insertOne({
			...req.body,
			_id: new ObjectId(),
			images: images,
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
	//

	/*
	try {
		if (error) {
			return res.status(400).send(error.details[0].message);
		}

		const images = req.files.map((file) => file.location);
		const result = await collection.insertOne({
			...req.body,
			_id: new ObjectId(),
			file: req.files,
		});
		console.log(req.params);
		res.send(result);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error connecting to the database');
	} finally {
		if (client) {
			await client.close();
		}
	}*/
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

const updateCatById = async (req, res) => {
	const collectionName = 'cats';
	const { client, collection } = await connectToDatabase(collectionName);
	const id = req.params.id;
	const newCat = req.body;

	try {
		const result = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: newCat }
		);
		res.send(result);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error updating document');
	} finally {
		if (client) {
			await client.close();
		}
	}
};

const deleteCatById = async (req, res) => {
	const collectionName = 'cats';
	const id = req.params.id;
	const { client, collection } = await connectToDatabase(collectionName);
	try {
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

export { addReport, getReports };
