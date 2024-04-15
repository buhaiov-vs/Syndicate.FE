import { api } from "@/lib/utils/clientApi"
import SignupResponse from "./types/signupResponse";
import SignupRequest from "./types/signupRequest";
import SigninRequest from "./signin/types/signinRequest";
import SigninResponse from "./signin/types/signinResponse";

export const signup = async (data: SignupRequest) => {
    return await api.post("/identity/signup", data) as SignupResponse;
}

export const signin = async (data: SigninRequest): Promise<SigninResponse> => {
    return await api.post("/identity/signin", data) as SigninResponse;
}