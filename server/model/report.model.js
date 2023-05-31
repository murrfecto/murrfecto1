import Joi from 'joi';

const fileUploadModel = Joi.object({
	originalname: Joi.string().required(),
	location: Joi.string().required(),
});
/*

const fileSchema = new mongoose.Schema({
	fileLink: String,
});

const File = mongoose.model('File', fileSchema);
*/
export { fileUploadModel };
