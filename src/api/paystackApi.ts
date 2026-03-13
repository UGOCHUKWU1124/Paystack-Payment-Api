import BaseApi from './baseApi';

interface Metadata {
    email: string;
    name: string;
    amount: number;
}

export interface InitializePaymentArgs {
    email: string;
    amount: number;
    callback_url?: string;
    metadata: Metadata;
}

interface PaystackAPIResponse<T> {
    status: boolean;
    message: string;
    data: T;
}

interface InitializePaymentResponse {
    authorization_url: string;
    access_code: string;
    reference: string;
}

interface VerifyPaymentResponse {
    amount: number;
    reference: string;
    status: string;
    metadata: Metadata;
}

class PaystackApi extends BaseApi {
    constructor() {
        super(process.env.PAYSTACK_BASE_URL!);
        this.client.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;
    }

    initializePayment = async (
        args: InitializePaymentArgs
    ): Promise<InitializePaymentResponse> => {
        const response = await this.post<PaystackAPIResponse<InitializePaymentResponse>>(
            '/transaction/initialize',
            args
        );
        return response.data;
    };

    verifyPayment = async (reference: string): Promise<VerifyPaymentResponse> => {
        const response = await this.get<PaystackAPIResponse<VerifyPaymentResponse>>(
            `/transaction/verify/${reference}`
        );
        return response.data;
    };
}

export default new PaystackApi();
