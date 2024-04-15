import { useState, useEffect } from "react";
import { BaseApiResponse, ResponseError, ResponseErrorType } from "../types/response";

export default function useFetch<TData>(
    fetcher: (request: any) => Promise<[TData | undefined, ResponseError | undefined]>,
    request: any,
    options?: {
        initialyLoading: boolean
    }) : { 
        data: TData | undefined,
        error: ResponseError | undefined | null,
        isLoading: boolean
    }
{
    const [data, setResponseData] = useState<TData>();
    const [error, setError] = useState<ResponseError | null>();
    const [isLoading, setIsLoading] = useState<boolean>(options?.initialyLoading ?? false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const [ data, error ] = await fetcher(request);

                if(error) {
                    setError(error);
                }
                setResponseData(data);
                setError(null);
            } catch {
                setError({ message: "Something went wrong.", type: ResponseErrorType.network });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [request]);

    return { data, error, isLoading };
};