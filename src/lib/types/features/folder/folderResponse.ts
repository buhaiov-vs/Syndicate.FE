import { BaseResponse } from "@/lib/types/response";
import { Folder } from "./folder";

export type FolderResponse<T> = BaseResponse<Folder<T>>;