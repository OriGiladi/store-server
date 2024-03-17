import { Joi } from 'celebrate';


export const createUserSchema = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        image: Joi.string().required(),
    }),
};

export const getUsersSchema  = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};
export const loginSchema  = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(), 
    }),
};
export const emailSchema  = {
    body: Joi.object({
        email: Joi.string().required(),
    }),
};
