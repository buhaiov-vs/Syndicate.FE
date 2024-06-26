import { BaseResponse } from "@/lib/types/response";
import { Service } from ".";
import { Folder } from "@/lib/types/features/folder/folder";

export type ServicesFolderResponse = BaseResponse<Folder<Service>>;