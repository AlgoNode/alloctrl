import { ErrorCode } from "$lib/forms/enums";
import type { LocaleDictionnary } from "$lib/types";

const strings: LocaleDictionnary =  {
  [ErrorCode.DEFAULT]: 'An error occured.',
  [ErrorCode.REQUIRED]: 'This field is required.',
  [ErrorCode.NOT_A_STRING]: 'Expecting a string.',
  [ErrorCode.NOT_A_NUMBER]: 'Expecting a number',
  [ErrorCode.NOT_AN_EMAIL]: `This should be a valid email address.`,
  [ErrorCode.NOT_AN_ADDRESS]: 'This should be a valid Algorand address.',
  [ErrorCode.NOT_AN_URL]: 'This should be a valid URL.',
  [ErrorCode.NOT_AN_OPTION]: 'This is not in the available options.',
  'hasErrors': 'The form contains errors. Please double-check your data and submit again.'
}

export default strings;