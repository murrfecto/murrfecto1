import Joi from "joi";

const catsModel = Joi.object({
    image: Joi.string().uri(),
    name: Joi.string(),
    description: Joi.string(),
    chipped: Joi.string(),
});

export {catsModel}