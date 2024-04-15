import { api } from "@/lib/utils/clientApi"
import ServicesResponse from "./types/servicesResponse";
import { BaseApiResponse, ResponseError, ResponseErrorType } from "@/lib/types/response";
import { Service } from "./types/service";
import ServiceResponse from "./types/serviceResponse";

export async function getServices(): Promise<ServicesResponse> {
    let response;
    try {
        response = await api.get("/services/draft") as BaseApiResponse<Array<Service>>;
    } catch {
        response = { error: { message: "Something went wrong.", type: ResponseErrorType.network } as ResponseError };
    }

    return [ response.data, response.error ];
}

export async function getService(id: string): Promise<ServiceResponse> {
    let response;
    
    try {
        response = await api.get(`/services/${id}`) as BaseApiResponse<Service>;
    } catch {
        response = { error: { message: "Something went wrong.", type: ResponseErrorType.network } as ResponseError };
    }

    return [ response.data, response.error ];
}
