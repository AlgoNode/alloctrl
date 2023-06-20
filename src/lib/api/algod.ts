import { PUBLIC_APP_HOST, PUBLIC_NODE_HOST } from "$env/static/public";
import { Method } from "$lib/enums";
import type { PostData } from "$lib/types";
import axios from "axios";


export default abstract class AlgodApi {

  /**
  * FETCH PUBLIC API
  * ==================================================
  */
  public static async public(endpoint: string) {
    try {
      return await axios({
        method: Method.GET,
        baseURL: PUBLIC_NODE_HOST,
        url: endpoint,
      });
    }
    catch(e: any) {
      return this.handleError(e)
    }
  }
  

  /**
  * FETCH PRIVATE API USING LOCAL PROXY
  * ==================================================
  */
  public static async private(method: Method, endpoint: string, data?: PostData) {
    try {
      return await axios({
        method,
        baseURL: `${ PUBLIC_APP_HOST }/proxy`,
        url: endpoint,
        data,
      });
    }
    catch(e: any) {
      return this.handleError(e)
    }
  }

  /**
  * ERROR HANDLER
  * ==================================================
  */
  private static handleError(e: any) {
    console.log('ERROR', e);
    return { error: true, data: {} }
  }
}
