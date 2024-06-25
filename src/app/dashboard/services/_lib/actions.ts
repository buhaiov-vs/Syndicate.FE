import { PostOptions, clientApi } from "@/lib/utils/clientApi"
import { BaseApiResponse, BaseResponse } from "@/lib/types/response";
import { Service } from "./types/service";
import { DraftServiceResponse } from "./types";
import { RequestOptions } from "@/lib/types/requestOptions";
import { ServiceForm } from "../[id]/_components/serviceDetailsForm";
import { CacheTags } from "@/lib/consts";
import { tagRevalidate } from "@/lib/utils";

export const draftService = async (name: string): Promise<DraftServiceResponse> => {
    const resp = await clientApi.post("/services/draft", { name: name }) as BaseApiResponse<Service>;

    return [ resp.data, resp.errors ];
}

export const deleteService = async (id: string): Promise<DraftServiceResponse> => {
    const resp = await clientApi.del("/services", { id }) as BaseApiResponse<any>;

    return [, resp.errors ];
}

export const updateService = async (service: ServiceForm, options?: RequestOptions<PostOptions>): Promise<DraftServiceResponse> => {
  const resp = await clientApi.post("/services", service, options) as BaseApiResponse<Service>;
  
  tagRevalidate(CacheTags.serviceId);
  tagRevalidate(CacheTags.servicesList);

  return [ resp.data, resp.errors ];
}

export const publishService = async (id: string, options?: RequestOptions<PostOptions>): Promise<BaseResponse<undefined>> => {
  const resp = await clientApi.post(`/services/${id}/publish`, options) as BaseApiResponse<undefined>;

  tagRevalidate(CacheTags.serviceId);
  tagRevalidate(CacheTags.servicesList);

  return [ resp.data, resp.errors ];
}

export const deactivateService = async (id: string, options?: RequestOptions<PostOptions>): Promise<BaseResponse<undefined>> => {
  const resp = await clientApi.post(`/services/${id}/deactivate`, options) as BaseApiResponse<undefined>;

  tagRevalidate(CacheTags.serviceId);
  tagRevalidate(CacheTags.servicesList);

  return [ resp.data, resp.errors ];
}

