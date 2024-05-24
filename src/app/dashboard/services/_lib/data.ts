import { BaseApiResponse, ResponseError, ResponseErrorType } from "@/lib/types/response";

import { Service, ServicesResponse, ServiceResponse } from "./types";
import { CacheTags } from "@/lib/consts/cacheTags";
import { serverApi } from "@/lib/utils/serverApi";

export async function getServices(): Promise<ServicesResponse> {
    let response;
    try {
        response = await serverApi.get("/services", { cacheTag: CacheTags.servicesList }) as BaseApiResponse<Array<Service>>;
    } catch {
        response = { error: { message: "Something went wrong.", type: ResponseErrorType.network } as ResponseError };
    }

    return [ response.data, response.error ];
}

export async function getService(id: string): Promise<ServiceResponse> {
    let response;
    
    try {
        response = await serverApi.get(`/services/${id}`) as BaseApiResponse<Service>;
    } catch {
        response = { error: { message: "Something went wrong.", type: ResponseErrorType.network } as ResponseError };
    }

    return [ response.data, response.error ];
}
