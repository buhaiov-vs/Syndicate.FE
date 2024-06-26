import { PostOptions, clientApi } from "@/lib/utils/clientApi"
import { BaseApiResponse, BaseResponse } from "@/lib/types/response";
import { Service } from "./types/service";
import { DraftServiceResponse } from "./types";
import { RequestOptions } from "@/lib/types/requestOptions";
import { ServiceForm } from "../[id]/_components/serviceDetailsForm";
import { CacheTags } from "@/lib/consts";
import { tagRevalidate } from "@/lib/utils";
import { Folder } from "@/lib/types/features";
import { FolderForm } from "../folders/[name]/_components";

export const draftService = async (name: string): Promise<DraftServiceResponse> => {
    const resp = await clientApi.post("/services/draft", { name: name }) as BaseApiResponse<Service>;

    tagRevalidate(CacheTags.servicesList);

    return [ resp.data, resp.errors ];
}

export const createServicesFolder = async (name: string): Promise<BaseResponse<undefined>> => {
  const resp = await clientApi.post("/services/folders", { name: name }, { settings: { ignoreResponse: true} }) as BaseApiResponse<undefined>;

  tagRevalidate(CacheTags.servicesList);

  return [ , resp.errors ];
}

export const deleteService = async (id: string): Promise<DraftServiceResponse> => {
    const resp = await clientApi.del("/services", { id }) as BaseApiResponse<any>;

    return [, resp.errors ];
}

export const updateService = async (id: string, service: ServiceForm, options?: RequestOptions<PostOptions>): Promise<DraftServiceResponse> => {
  const resp = await clientApi.post(`/services/${id}`, service, options) as BaseApiResponse<Service>;
  
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

export const updateServicesFolder = async (id: string, service: FolderForm, options?: RequestOptions<PostOptions>): Promise<DraftServiceResponse> => {
  const resp = await clientApi.post(`/services/folders/${id}`, service, options) as BaseApiResponse<Service>;
  
  tagRevalidate(CacheTags.servicesList);

  return [ resp.data, resp.errors ];
}