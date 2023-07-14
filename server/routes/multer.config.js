import multer from 'multer';
import * as dotenv from 'dotenv';

dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/');
    },

    filename: function (req, file, cb) {
        let extArray = file.mimetype.split('/');
        let extension = extArray[extArray.length - 1];
        let fileName = file.fieldname + '-' + Date.now() + '.' + extension;
        req.fileUrls = req.fileUrls || [];
        req.fileUrls.push(`${process.env.BASE_URL}/images/` + fileName);
        cb(null, fileName);
    },
});

const fileFilter = function (req, file, cb) {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/svg' ||
        file.mimetype === 'image/webp' ||
        file.mimetype === 'application/pdf'
    )  {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file
        cb(new Error('Error in file type'));
    }
};

const upload = multer({storage, fileFilter});

export {upload};
