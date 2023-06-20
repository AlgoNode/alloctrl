import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import type { Payload } from '$lib/types';
import type { AxiosError } from 'axios';
import { PUBLIC_NODE_HOST } from "$env/static/public";
import { SECRET_ALGOD_ADMIN_TOKEN } from "$env/static/private";
import { json, error } from '@sveltejs/kit'; 
import axios from 'axios';

/**
* Proxy
* ==================================================
*/
const proxy = async (req: RequestEvent) => {
  const { 
    params: { endpoint },
    request: { method, body }, 
  } = req;
  try {
    const response = await axios({
      baseURL: PUBLIC_NODE_HOST,
      method,
      url: endpoint,
      data: body,
      headers: { 'X-Algo-API-Token': SECRET_ALGOD_ADMIN_TOKEN },
    });
    return json(response?.data);
  }
  catch (e: any|AxiosError) {
    const { response: { status, statusText }} = e;
    throw error(status, statusText);
  }
}


export const GET: RequestHandler<Payload> = proxy;
export const POST: RequestHandler<Payload> = proxy;
export const PUT: RequestHandler<Payload> = proxy;
export const DELETE: RequestHandler<Payload> = proxy;

