import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const objectToValidate = {
            body: req.body,
            params: req.params,
            query: req.query
        };

        const { error } = schema.validate(objectToValidate, {
            abortEarly: false,
            allowUnknown: true
        });

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({
                success: false,
                message: errorMessage
            });
        }

        next();
    };
};
