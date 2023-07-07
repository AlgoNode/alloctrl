import type { FieldValue } from "./types";
import { FieldType } from "./enums";
import { isNumber, isString } from "lodash-es";
import { ErrorCode } from "$lib/enums";



export const typeValidation = {
  [FieldType.STRING]: [ isString ],
  [FieldType.NUMBER]: [ isNumber ],
  [FieldType.EMAIL]: [ isString, isEmail ],
  [FieldType.URL]: [ isString, isUrl ],
  [FieldType.ADDRESS]: [ isString, isAddress ],
}


export function isRequired(value: FieldValue) {
  return Boolean(value) || { code: ErrorCode.REQUIRED };
}


export function isEmail(str: FieldValue) {
  if (typeof str !== 'string') return  { code: ErrorCode.NOT_A_STRING };
  return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(str) || { code: ErrorCode.NOT_AN_EMAIL };
}


// Base32 Hash (58 chars = account)
// https://github.com/algorand/js-algorand-sdk/blob/cfd5b8891e2e44f1c546e4db734f8287e9a6ef72/src/encoding/address.ts#L10
export function isAddress(str: FieldValue) {
  if (typeof str !== 'string') return  { code: ErrorCode.NOT_A_STRING };
  return /^([A-Z2-7]{58})+$/.test(str) || { code: ErrorCode.NOT_AN_ADDRESS };
}


// https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator

export function isUrl(str: FieldValue) {
  if (typeof str !== 'string') return  { code: ErrorCode.NOT_A_STRING };
  return urlPattern.test(str);
}
