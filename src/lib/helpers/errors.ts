import { error } from '@sveltejs/kit'; 
import axios from 'axios';



export function getApiError(e: unknown) {
  // console.log('ALGOD API ERROR', e);
  if (axios.isAxiosError(e)) return error(e.status!, e.message);
  return error(400)

}