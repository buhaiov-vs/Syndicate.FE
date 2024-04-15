export type BaseApiResponse<T> = {
    data?: T,
    error?: ResponseError,
}

export type BaseResponse<T> = [ T | undefined, ResponseError | undefined ];
export type BaseListResponse<T> = [ Array<T> | undefined, ResponseError | undefined ];

export type ResponseError = {
    message: string;
    code?: number;
    type?: ResponseErrorType
}

export enum ResponseErrorType {
    api,
    network
}