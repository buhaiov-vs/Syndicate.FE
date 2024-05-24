import { clientApi } from "@/lib/utils/clientApi"
import { SignupData, SignupResponse } from "../_types/signupResponse";
import SignupRequest from "../_types/signupRequest";
import SigninRequest from "../signin/_types/signinRequest";
import { SigninResponse, SigninData } from "../signin/_types/signinResponse";
import { BaseApiResponse, ResponseError, ResponseErrorType } from "@/lib/types/response";

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
    let response;
    try {
        response = await clientApi.post("/identity/signup", data) as BaseApiResponse<SignupData>;
    } catch {
        response = { error: { message: "Something went wrong.", type: ResponseErrorType.network } as ResponseError };
    }

    return [ response.data, response.error ];
}

export const signin = async (data: SigninRequest): Promise<SigninResponse> => {
    let response;
    try {
        response = await clientApi.post("/identity/signin", data) as BaseApiResponse<SigninData>;
    } catch {
        response = { error: { message: "Something went wrong.", type: ResponseErrorType.network } as ResponseError };
    }

    return [ response.data, response.error ];
}