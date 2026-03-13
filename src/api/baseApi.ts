import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../packages/error-handler';

class BaseApi {
    protected client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    request = async <T>(
        url: string,
        data?: any,
        params?: Record<string, any>,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        try {
            const response = await this.client.request<T>({
                url,
                data,
                params,
                ...config,
            });

            if (response.status === StatusCodes.NO_CONTENT) {
                return undefined as T;
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new BadRequestError(
                    error.response.data?.message || error.response.statusText
                );
            }

            throw new BadRequestError(error.message);
        }
    };

    get = <T>(
        url: string,
        params?: Record<string, any>,
        config?: AxiosRequestConfig
    ): Promise<T> =>
        this.request<T>(url, undefined, params, {
            ...config,
            method: 'GET',
        });

    post = <T>(
        url: string,
        data?: Record<string, any>,
        params?: Record<string, any>,
        config?: AxiosRequestConfig
    ): Promise<T> =>
        this.request<T>(url, data, params, {
            ...config,
            method: 'POST',
        });
}

export default BaseApi;
