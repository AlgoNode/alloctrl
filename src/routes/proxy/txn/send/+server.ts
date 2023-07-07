import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import type { Payload } from '$lib/types';
import { getApiError } from '$lib/helpers/errors';
import { json } from '@sveltejs/kit'; 
import algostack from '$lib/api/algostack.server';

/*** 
* SEND A TRANSACTION
* ==================================================
*/
export const POST: RequestHandler<Payload> = async (req: RequestEvent) => {
  const { request } = req;
  try {
    const data = await request.json();
    const signedTxns = data.length === 1 
      ? new Uint8Array( Object.values(data[0]) )
      : data.map((buffer: ArrayBufferLike) => new Uint8Array( Object.values(buffer) ));
    const sent = await algostack.txns!.submitTxns( signedTxns )
    return json(sent);
  }
  catch (e) {
    throw getApiError(e);
  }
};
