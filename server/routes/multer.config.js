import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { v4 } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
	},
});

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'murrfecto',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: (req, file, cb) =>
			req.body.filename ? cb(null, req.body.filename) : cb(null, v4()),
	}),
});

export { upload, s3 };
