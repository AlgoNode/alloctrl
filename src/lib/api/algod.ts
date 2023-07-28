import { env as publicEnv } from "$env/dynamic/public";
import { Method } from "$lib/enums";
import camelcaseKeys from "camelcase-keys";
import axios from "axios";
import algostack from "./algostack.public";

export default abstract class AlgodApi {
  
  /**
  * FETCH PUBLIC API
  * ==================================================
  */
  /*  eslint-disable no-async-promise-executor */
  public static fetchPublic(method: Method, endpoint: string, data?: unknown): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          method,
          baseURL: publicEnv.PUBLIC_ALGOD_HOST,
          url: endpoint,
          data,
        });
        resolve( camelcaseKeys(response?.data, { deep: true }));
      }
      catch(e: unknown) {
        reject( this.handleError(e) );
      }
    });
  }

  
  

  /**
  * FETCH PRIVATE API USING LOCAL PROXY
  * ==================================================
  */
  /*  eslint-disable no-async-promise-executor */
  private static fetchPrivate(method: Method, endpoint: string, data?: unknown): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          method,
          baseURL: '/proxy',
          url: endpoint,
          data,
        });
        resolve( camelcaseKeys(response?.data, { deep: true }) );
      }
      catch(e: unknown) {
        reject( this.handleError(e) )
      }
    })
  }



  /**
  * Creage, Sign and Send Transactions
  * ==================================================
  */
  /*  eslint-disable no-async-promise-executor */
  public static sendTxn(params: Record<string,unknown>) {
    return new Promise(async (resolve) => {
      try {
        const { data: txnParams } = await axios.post('/proxy/txn/make', params);
        const txn = algostack.txns!.makeTxn(txnParams); 
        const signedTxn = await algostack.txns!.signTxns( txn );
        if (!signedTxn) return resolve( undefined );
        const sentTxn = await axios.post('/proxy/txn/send', signedTxn);
        resolve( camelcaseKeys(sentTxn?.data, { deep: true }) );
      }
      catch(e: unknown) {
        resolve( this.handleError(e) )
      }
    });
  }




  public static public = {
    get: (endpoint: string, data?: unknown) => this.fetchPublic(Method.GET, endpoint, data),
    post: (endpoint: string, data?: unknown) => this.fetchPublic(Method.POST, endpoint, data),
    put: (endpoint: string, data?: unknown) => this.fetchPublic(Method.PUT, endpoint, data),
    delete: (endpoint: string, data?: unknown) => this.fetchPublic(Method.DELETE, endpoint, data),
  }
  public static private = {
    get: (endpoint: string, data?: unknown) => this.fetchPrivate(Method.GET, endpoint, data),
    post: (endpoint: string, data?: unknown) => this.fetchPrivate(Method.POST, endpoint, data),
    put: (endpoint: string, data?: unknown) => this.fetchPrivate(Method.PUT, endpoint, data),
    delete: (endpoint: string, data?: unknown) => this.fetchPrivate(Method.DELETE, endpoint, data),
    txn: (params: Record<string,unknown>) => this.sendTxn(params),
  }


  
  /**
  * ERROR HANDLER
  * ==================================================
  */
  private static handleError(e: unknown) {
    return { error: true, data: e }
  }
}
