import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { getApiError } from '$lib/helpers/errors';
import { env as publicEnv } from "$env/dynamic/public";
import { env as privateEnv } from "$env/dynamic/private";
import { json, error } from '@sveltejs/kit'; 
import axios from 'axios';
import type { Payload } from '$lib/types';

/**
* Intercept errors 
* ==================================================
*/
axios.interceptors.response.use(
  response => response, 
  error => Promise.reject( error.errno > 0 ? error : undefined)
);

/**
* Proxy
* ==================================================
*/
const proxy = async (req: RequestEvent) => {
  const { 
    params: { endpoint },
    request: { method, body }, 
  } = req;
  if (!endpoint) throw error(404, 'Endpoint not provided');
  try {
    const data = typeof body === 'string' ? Buffer.from(body, 'binary') : body
    const response = await axios({
      baseURL: `http://${ publicEnv.PUBLIC_ALGOD_HOST }:${ publicEnv.PUBLIC_ALGOD_PORT }`,
      method,
      url: endpoint,
      data,
      headers: { 
        'X-Algo-API-Token': privateEnv.SECRET_ALGOD_ADMIN_TOKEN ,
        ...( data instanceof ReadableStream 
          ? { 'Content-Type': 'application/x-binary' }
          : {} 
        ),
      },
    });
    return json(response?.data);
  }
  catch (e) {
    throw getApiError(e)
  }
}


export const GET: RequestHandler<Payload> = proxy;
export const POST: RequestHandler<Payload> = proxy;
export const PUT: RequestHandler<Payload> = proxy;
export const DELETE: RequestHandler<Payload> = proxy;

