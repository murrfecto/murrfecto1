import * as fs from "fs";
import path from "path";

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
	try {
		const filename = req.headers['filename'];

		if (!filename) {
			return res.status(400).send({ message: 'Filename not provided.' });
		}

		const filePath = path.join(__dirname, 'images', filename);

		fs.unlink(filePath, (err) => {
			if (err) {
				console.error('Error deleting file:', err);
				return res.status(500).send({ message: 'Failed to delete the file.' });
			}

			res.sendStatus(204);
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: 'Failed to delete the file.' });
	}
};

export { addReport, deleteReport };
