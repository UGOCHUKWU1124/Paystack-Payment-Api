import paystackApi, { InitializePaymentArgs } from '../api/paystackApi';
import { prisma } from '../packages/prisma';
import { BadRequestError } from '../packages/error-handler';

class PaymentService {
    async initializePayment(amount: number, email: string, callbackUrl: string, name: string) {
        const paymentDetails: InitializePaymentArgs = {
            amount: amount * 100, // Convert to kobo
            email,
            callback_url: callbackUrl,
            metadata: {
                amount, // Keep original amount in metadata
                email,
                name,
            },
        };

        const data = await paystackApi.initializePayment(paymentDetails);
        return data;
    }

    async verifyPayment(reference: string) {
        const response = await paystackApi.verifyPayment(reference);
        const { status: transactionStatus, reference: paymentReference, metadata } = response;

        if (!metadata) {
            throw new BadRequestError('Transaction metadata missing');
        }

        const { email, name } = metadata;
        const amount = Number(metadata.amount);

        if (transactionStatus !== 'success') {
            return {
                status: transactionStatus,
                reference: paymentReference,
                amount,
                email,
                name
            };
        }

        // Check if payment already exists
        const existingPayment = await prisma.payments.findUnique({
            where: { reference: paymentReference },
        });

        if (existingPayment) {
            return existingPayment;
        }

        const payment = await prisma.payments.create({
            data: { email, name, amount, reference: paymentReference, status: transactionStatus },
        });

        return payment;
    }
}

export default new PaymentService();