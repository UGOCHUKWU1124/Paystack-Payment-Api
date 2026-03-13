import Joi from 'joi';

export const initializePaymentSchema = Joi.object({
    body: Joi.object({
        amount: Joi.number().required().messages({
            'any.required': 'Amount is required',
            'number.base': 'Amount must be a number',
        }),
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.email': 'Invalid email format',
        }),
        callbackUrl: Joi.string().uri().required().messages({
            'any.required': 'Callback URL is required',
            'string.uri': 'Invalid callback URL format',
        }),
        name: Joi.string().required().messages({
            'any.required': 'Name is required',
        }),
    }),
});

export const verifyPaymentSchema = Joi.object({
    query: Joi.object({
        reference: Joi.string().required().messages({
            'any.required': 'Transaction reference is required',
        }),
    }),
});
