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
export const rateProductSchema  = {
    body: Joi.object({
        ratings: Joi.array().items(
            Joi.object({
                user: Joi.string().required(),
                rating: Joi.number().required().min(1).max(5),
            })
        ),
    }),
}
