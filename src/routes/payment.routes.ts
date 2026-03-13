import express from 'express';
import paystackController from '../controller/payment.controller';
import { validate } from '../packages/middleware/validate';
import { initializePaymentSchema, verifyPaymentSchema } from '../validator/payment.schema';

const paystackRoute = express.Router();

paystackRoute.post('/initialize', validate(initializePaymentSchema), paystackController.initializePayment);
paystackRoute.get('/paystack/verify', validate(verifyPaymentSchema), paystackController.verifyPayment);

export default paystackRoute;