import type { Payload } from "$lib/types";
import { PUBLIC_APP_HOST, PUBLIC_NODE_HOST } from "$env/static/public";
import { Method } from "$lib/enums";
import camelcaseKeys from "camelcase-keys";
import axios from "axios";
import algostack from "./algostack.public";


export default abstract class AlgodApi {

  /**
  * FETCH PUBLIC API
  * ==================================================
  */
  public static fetchPublic(method: Method, endpoint: string, data?: any): Promise<Payload> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          method,
          baseURL: PUBLIC_NODE_HOST,
          url: endpoint,
          data,
        });
        resolve( camelcaseKeys(response?.data, { deep: true }));
      }
      catch(e: any) {
        reject( this.handleError(e) );
      }
    });
  }

  
  

  /**
  * FETCH PRIVATE API USING LOCAL PROXY
  * ==================================================
  */
  private static fetchPrivate(method: Method, endpoint: string, data?: any): Promise<Payload> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          method,
          baseURL: `${ PUBLIC_APP_HOST }/proxy`,
          url: endpoint,
          data,
        });
        resolve( camelcaseKeys(response?.data, { deep: true }) );
      }
      catch(e: any) {
        reject( this.handleError(e) )
      }
    })
  }



  /**
  * Creage, Sign and Send Transactions
  * ==================================================
  */
  public static async sendTxn(params: Record<string,any>) {
    return new Promise(async (resolve) => {
      try {
        const { data: txnParams } = await axios.post(`${ PUBLIC_APP_HOST }/proxy/txn/make`, params);
        const txn = algostack.txns!.makeTxn(txnParams); 
        const signedTxn = await algostack.txns!.signTxns( txn );
        if (!signedTxn) return resolve( undefined );
        const sentTxn = await axios.post(`${ PUBLIC_APP_HOST }/proxy/txn/send`, signedTxn);
        resolve( camelcaseKeys(sentTxn?.data, { deep: true }) );
      }
      catch(e: any) {
        resolve( this.handleError(e) )
      }
    });
  }




  public static public = {
    get: (endpoint: string, data?: any) => this.fetchPublic(Method.GET, endpoint, data),
    post: (endpoint: string, data?: any) => this.fetchPublic(Method.POST, endpoint, data),
    put: (endpoint: string, data?: any) => this.fetchPublic(Method.PUT, endpoint, data),
    delete: (endpoint: string, data?: any) => this.fetchPublic(Method.DELETE, endpoint, data),
  }
  public static private = {
    get: (endpoint: string, data?: any) => this.fetchPrivate(Method.GET, endpoint, data),
    post: (endpoint: string, data?: any) => this.fetchPrivate(Method.POST, endpoint, data),
    put: (endpoint: string, data?: any) => this.fetchPrivate(Method.PUT, endpoint, data),
    delete: (endpoint: string, data?: any) => this.fetchPrivate(Method.DELETE, endpoint, data),
    txn: (params: Record<string,any>) => this.sendTxn(params),
  }


  
  /**
  * ERROR HANDLER
  * ==================================================
  */
  private static handleError(e: any) {
    console.log('ERROR', e);
    return { error: true, data: e }
  }
}
