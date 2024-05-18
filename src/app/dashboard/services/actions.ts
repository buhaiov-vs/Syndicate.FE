import { PostOptions, api } from "@/lib/utils/clientApi"
import { BaseApiResponse } from "@/lib/types/response";
import { Service } from "./types/service";
import DraftServiceResponse from "./types/servicesDraftResponse";
import { ServiceForm } from "./components/ServiceDetails";
import { RequestOptions } from "@/lib/types/requestOptions";

export const draftService = async (name: string): Promise<DraftServiceResponse> => {
    const resp = await api.post("/services/draft", { name: name }) as BaseApiResponse<Service>;

    return [ resp.data, resp.error ];
}

export const deleteService = async (service: Service): Promise<DraftServiceResponse> => {
    const resp = await api.del("/services", { id: service.id }) as BaseApiResponse<any>;

    return [, resp.error ];
}

export const updateService = async (service: ServiceForm, options?: RequestOptions<PostOptions>): Promise<DraftServiceResponse> => {
  const resp = await api.post("/services", service, options) as BaseApiResponse<Service>;

  return [ resp.data, resp.error ];
}

