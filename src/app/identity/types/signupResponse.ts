import { BaseResponse } from "@/lib/types/response";

export type SignupResponse = BaseResponse<SignupData>;

export type SignupData = { userId: string };