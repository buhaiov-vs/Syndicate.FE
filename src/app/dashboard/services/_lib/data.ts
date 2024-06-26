import { BaseApiResponse, ResponseError, ResponseErrorType } from "@/lib/types/response";

import { Service, ServicesResponse, ServiceResponse, ServicesFolderResponse } from "./types";
import { CacheTags } from "@/lib/consts/cacheTags";
import { serverApi } from "@/lib/utils/serverApi";
import { Folder } from "@/lib/types/features";

export async function getServices(): Promise<ServicesResponse> {
    let response;
    try {
        response = await serverApi.get("/services", { cacheTag: CacheTags.servicesList }) as BaseApiResponse<Array<Service>>;
    } catch {
        response = { errors: [{ message: "Something went wrong.", type: ResponseErrorType.network }] as ResponseError[] };
    }

    return [ response.data, response.errors ];
}

export async function getService(id: string): Promise<ServiceResponse> {
    let response;
    
    try {
        response = await serverApi.get(`/services/${id}`, { cacheTag: CacheTags.serviceId }) as BaseApiResponse<Service>;
    } catch {
        response = { error: [{ message: "Something went wrong.", type: ResponseErrorType.network }] as ResponseError[] };
    }

    return [ response.data, response.errors ];
}

export async function getServicesFolder(name: string): Promise<ServicesFolderResponse> {
  let response;
  
  try {
      response = await serverApi.get(`/services/folders/${name}`, { cacheTag: CacheTags.folderId }) as BaseApiResponse<Folder<Service>>;
  } catch {
      response = { error: [{ message: "Something went wrong.", type: ResponseErrorType.network }] as ResponseError[] };
  }

  return [ response.data, response.errors ];
}
