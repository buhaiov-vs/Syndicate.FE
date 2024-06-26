import config from '@/config';
import { BaseApiResponse, ResponseErrorType } from '@/lib/types/response';
import { RequestOptions } from '../types/requestOptions';
import { toast } from 'react-toastify';
import { CacheTags } from '../consts';
import { error } from 'console';

export type GetOptions = {
  cacheTag?: string
}
const get = async (url: string, options?: GetOptions) => {
  try {
    const request = config.apiUrl + url;
    if (config.debug) {
      console.log('GET ', request);
    }

    let cacheTags = [CacheTags.all, CacheTags.c_all];
    options?.cacheTag && cacheTags.push(options.cacheTag);

    const response = await fetch(request, {
      credentials: 'include',
      next: {
        tags: cacheTags,
        revalidate: 3600,
      },
    });

    const body = await response.json();

    if (config.debug) {
      console.log('RESP', body);
    }

    return body;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
};

export type PostOptions = {
  ignoreResponse?: boolean;
  readErrorResponse?: boolean;
}
const post = async <T>(url: string, data?: object, options?: RequestOptions<PostOptions>): Promise<BaseApiResponse<T>> => {
  try {
    const request = config.apiUrl + url;
    if (config.debug) {
      console.log('POST ', request);
      console.log('BODY ', data);
    }

    const response = await fetch(config.apiUrl + url, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined,
    });

    if (options?.settings?.ignoreResponse && response.status == 200) return Promise.resolve({});
    if (response.status != 200 && !options?.settings?.readErrorResponse) {
      return Promise.resolve({
        errors: [{
          code: response.status,
          message: "Sorry, something went wrong! Please, try again later.",
          type: ResponseErrorType.api
        }]
      });
    }
    
    const body = await response.json();
    if (config.debug) {
      console.log('RESP', body);
    }

    return body;
  } catch (error) {    
    if(!options?.settings?.ignoreNetworkError) {
      toast.error("Sorry, we detected something wrong with network! Please, try again later.");
    }

    return {
      error: {
        code: 500,
        message: "Sorry, something went wrong! Please, try again later.",
        type: ResponseErrorType.network
      }
    } as BaseApiResponse<any>;
  }
};


export type DeleteOptions = {
  waitForResponse?: boolean;
}
const del = async (url: string, data?: object, options: DeleteOptions = { waitForResponse: true }) => {
  try {
    const request = config.apiUrl + url;
    if (config.debug) {
      console.log('DELETE ', request);
      console.log('BODY ', data);
    }

    const res = await fetch(config.apiUrl + url, {
      cache: 'no-store',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined,
    });

    if (options.waitForResponse) {
      const resp = await res.json();

      if (config.debug) {
        console.log('RESP ', resp);
      }

      return resp;
    }
  } catch (error) {
    return {
      error: {
        message: "Sorry, something went wrong! Please, try again later.",
        type: ResponseErrorType.network
      }
    } as BaseApiResponse<any>;
  }
};

export const clientApi = { get, post, del };