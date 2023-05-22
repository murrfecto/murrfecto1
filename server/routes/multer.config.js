import multer from "multer";
import {S3Client} from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import {v4} from 'uuid'

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    }
})

const fileFilter = function (req, file, cb) {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Only PNG, JPEG, and JPG files are allowed'));
    }
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'murrfecto',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, v4())
        }
    }), fileFilter
});


export {upload};

