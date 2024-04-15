import config from '@/config';
import { BaseApiResponse, ResponseErrorType } from '@/lib/types/response';

type GetOptions = {
  cacheTag?: string
}
const get = async (url: string, options?: GetOptions) => {
  try {
    const request = config.apiUrl + url;
    if (config.debug) {
      console.log('GET ', request);
    }

    var cacheTags = ['all'];
    options?.cacheTag && cacheTags.push(options.cacheTag);

    const res = await fetch(config.apiUrl + url, {
      credentials: 'include',
      next: {
        tags: cacheTags,
        revalidate: 3600,
      },
    });
    const resp = await res.json();

    if (config.debug) {
      console.log('RESP', resp);
    }

    return resp;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
};

type PostOptions = {
  waitForResponse?: boolean;
}
const post = async (url: string, data?: object, options: PostOptions = { waitForResponse: true }) => {
  try {
    const request = config.apiUrl + url;
    if (config.debug) {
      console.log('POST ', request);
      console.log('BODY ', data);
    }

    const res = await fetch(config.apiUrl + url, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined,
    });

    if (options.waitForResponse) {
      const resp = await res.json();

      if (config.debug) {
        console.log('RESP', resp);
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


type DeleteOptions = {
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

export const api = { get, post, del };