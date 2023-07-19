import Joi from "joi";

const catsModel = Joi.object({
    images: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    chipped: Joi.string().required(),
    age: Joi.string().required(),
    gender: Joi.string().required()
});

export {catsModel};
