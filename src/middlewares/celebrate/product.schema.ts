import { Joi } from 'celebrate';


export const createProductSchema  = {
    body: Joi.object({
        name: Joi.string().required(),
        price: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string(),
    }),
};
export const getProductSchema  = {
    body: Joi.object({}), 
};
