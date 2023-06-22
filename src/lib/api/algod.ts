import type { Payload, PostData } from "$lib/types";
import { PUBLIC_APP_HOST, PUBLIC_NODE_HOST } from "$env/static/public";
import { Method } from "$lib/enums";
import camelcaseKeys from "camelcase-keys";
import axios from "axios";


export default abstract class AlgodApi {

  /**
  * FETCH PUBLIC API
  * ==================================================
  */
  public static fetchPublic(method: Method, endpoint: string, data?: PostData): Promise<Payload> {
    return new Promise(async (resolve) => {
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
        resolve( this.handleError(e) );
      }
    });
  }

  public static public = {
    get: (endpoint: string, data?: PostData) => this.fetchPublic(Method.GET, endpoint, data),
    post: (endpoint: string, data?: PostData) => this.fetchPublic(Method.POST, endpoint, data),
    put: (endpoint: string, data?: PostData) => this.fetchPublic(Method.PUT, endpoint, data),
    delete: (endpoint: string, data?: PostData) => this.fetchPublic(Method.DELETE, endpoint, data),
  }
  

  /**
  * FETCH PRIVATE API USING LOCAL PROXY
  * ==================================================
  */
  private static fetchPrivate(method: Method, endpoint: string, data?: PostData): Promise<Payload> {
    return new Promise(async (resolve) => {
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
        resolve( this.handleError(e) )
      }
    })
  }

  public static private = {
    get: (endpoint: string, data?: PostData) => this.fetchPrivate(Method.GET, endpoint, data),
    post: (endpoint: string, data?: PostData) => this.fetchPrivate(Method.POST, endpoint, data),
    put: (endpoint: string, data?: PostData) => this.fetchPrivate(Method.PUT, endpoint, data),
    delete: (endpoint: string, data?: PostData) => this.fetchPrivate(Method.DELETE, endpoint, data),
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
