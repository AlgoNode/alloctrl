import type { AxiosInstance } from 'axios';


export interface FetchOptions {
  client: AxiosInstance, 
  endpoint?:string, 
  method?: 'GET'|'POST'|'PUT'|'DELETE',
  paramsAllowlist?: string[],
  searchParams?: URLSearchParams,
  params?: Record<string, any>,
}