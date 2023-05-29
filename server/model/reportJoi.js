const Joi = require("joi");

const postSchema = Joi.object({
  fileName: Joi.string().optional(),
  filePath: Joi.string().required(),
});

const postValidator = (postSchema) => (body) => {
  return postSchema.validate(body);
};

const reportPostValidator = postValidator(postSchema);

module.exports = { reportPostValidator };
