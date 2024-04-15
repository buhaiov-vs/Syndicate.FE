import config from '@/config';
import { cookies } from 'next/headers';

type GetOptions = {
  cacheTag?: string
}
const get = async (url: string, options?: GetOptions) => {
  try {
    const request = config.apiUrl + url;
    if (config.debug) {
      console.log('S GET ', request);
    }

    var cacheTags = ['s_all'];
    options?.cacheTag && cacheTags.push(options.cacheTag);

    const res = await fetch(config.apiUrl + url, {
      credentials: 'include',
      headers: {
        Cookie: cookies().toString()
      },
      next: {
        tags: cacheTags,
        revalidate: 3600,
      },
    });
    
    const resp = await res.json();

    if (config.debug) {
      console.log('S RESP', resp);
    }

    return resp;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
};

export const api = { get };