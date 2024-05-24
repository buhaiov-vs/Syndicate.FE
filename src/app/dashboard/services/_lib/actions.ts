import { PostOptions, clientApi } from "@/lib/utils/clientApi"
import { BaseApiResponse } from "@/lib/types/response";
import { Service } from "./types/service";
import { DraftServiceResponse } from "./types";
import { RequestOptions } from "@/lib/types/requestOptions";
import { ServiceForm } from "../[id]/_components/serviceDetailsForm";

export const draftService = async (name: string): Promise<DraftServiceResponse> => {
    const resp = await clientApi.post("/services/draft", { name: name }) as BaseApiResponse<Service>;

    return [ resp.data, resp.error ];
}

export const deleteService = async (id: string): Promise<DraftServiceResponse> => {
    const resp = await clientApi.del("/services", { id }) as BaseApiResponse<any>;

    return [, resp.error ];
}

export const updateService = async (service: ServiceForm, options?: RequestOptions<PostOptions>): Promise<DraftServiceResponse> => {
  const resp = await clientApi.post("/services", service, options) as BaseApiResponse<Service>;

  return [ resp.data, resp.error ];
}

