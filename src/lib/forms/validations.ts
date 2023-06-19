import type { FieldValue } from "./types";
import { isUrl, isAddress } from "algostack/helpers/strings";
import { isEmail } from "$lib/helpers/strings";
import { ErrorCode, FieldType } from "./enums";
import { isNil, isNumber, isString } from "lodash-es";


export function isRequired(value: FieldValue) {
  return Boolean(value) || { code: ErrorCode.REQUIRED };
}


export const typeValidation = {
  [FieldType.STRING]: [ isString ],
  [FieldType.NUMBER]: [ isNumber ],
  [FieldType.EMAIL]: [ isString, isEmail ],
  [FieldType.URL]: [ isString, isUrl ],
  [FieldType.ADDRESS]: [ isString, isAddress ],
}