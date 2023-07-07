import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import type { Payload } from '$lib/types';
import { getApiError } from '$lib/helpers/errors';
import { json } from '@sveltejs/kit'; 
import algostack from '$lib/api/algostack.server';

/*** 
* CREATE A TRANSACTION
* ==================================================
*/
export const POST: RequestHandler<Payload> = async (req: RequestEvent) => {
  const { request } = req;
  try {
    const params = await request.json();
    const txn = await algostack.txns!.prepareTxn(params);
    return json(txn || {});
  }
  catch (e) {
    throw getApiError(e)
  }
};