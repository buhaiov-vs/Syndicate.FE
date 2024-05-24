import config from '@/config';
import { cookies } from 'next/headers';
import { CacheTags } from '../consts';

type GetOptions = {
  cacheTag?: string
}

const get = async (url: string, options?: GetOptions) => {
  try {
    const request = config.apiUrl + url;
    if (config.debug) {
      console.log('S GET ', request);
    }

    let cacheTags = [CacheTags.all, CacheTags.s_all];
    options?.cacheTag && cacheTags.push(options.cacheTag);

    const a = cookies().toString();

    const res = await fetch(config.apiUrl + url, {
      headers: {
        Cookie: a
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

export const serverApi = { get };