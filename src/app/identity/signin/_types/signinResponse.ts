import { BaseResponse } from "@/lib/types/response";

export type SigninResponse = BaseResponse<SigninData>;

export type SigninData = { userId: string }