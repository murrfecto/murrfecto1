import multer from "multer";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split('/');
        let extension = extArray[extArray.length - 1];
        let fileName = file.fieldname + '-' + Date.now() + '.' + extension;
        req.fileUrls = req.fileUrls || [];
        req.fileUrls.push('http://localhost:3000/images/' + fileName);
        cb(null, fileName);
    },
});

// Define the fileFilter function
const fileFilter = function (req, file, cb) {
    // Check if the file type is either PNG, JPEG, or JPG
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
    ) {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file
        cb(new Error('Only PNG, JPEG, and JPG files are allowed'));
    }
};

const upload = multer({ storage, fileFilter });


export { upload };

