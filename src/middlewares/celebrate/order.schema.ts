import { Joi } from 'celebrate';

export const createOrderSchema  = {
    body: Joi.object({
        order: Joi.array().items({
            product: Joi.string().required(),
            quantity: Joi.number().required(),
        }),
        user: Joi.string().required(),
        createdAt: Joi.date().required()
    })
};
export const getOrdersOfUserSchema  = {
    body: Joi.object({
            user: Joi.string().required()
        })
}


