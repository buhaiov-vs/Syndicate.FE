export type RequestOptions<T> = {
  headers?: any,
  settings?: T & {
    ignoreNetworkError?: boolean,    
  },
}