import { asyncHandler } from '../packages/middleware/asyncHandler';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import paymentService from '../service/payment.service';

class PaystackController {
    initializePayment = asyncHandler(async (req: Request, res: Response) => {
        const { amount, email, callbackUrl, name } = req.body;

        const data = await paymentService.initializePayment(amount, email, callbackUrl, name);

        return res.status(StatusCodes.OK).send({
            message: 'Payment initialized successfully',
            data,
        });
    });

    verifyPayment = asyncHandler(async (req: Request, res: Response) => {
        const reference = req.query.reference as string;

        const data = await paymentService.verifyPayment(reference);

        return res.status(StatusCodes.OK).send({
            message: data.status === 'success' ? 'Payment verified' : `Payment verification: ${data.status}`,
            data,
        });
    });
}

const paystackController = new PaystackController();

export default paystackController;