import type { LocaleDictionnary } from "$lib/types";
import { ErrorCode } from "$lib/enums";

const strings: LocaleDictionnary =  {
  [ErrorCode.DEFAULT]: 'An error occured.',
  [ErrorCode.REQUIRED]: 'This field is required.',
  [ErrorCode.NOT_A_STRING]: 'Expecting a string.',
  [ErrorCode.NOT_A_NUMBER]: 'Expecting a number',
  [ErrorCode.NOT_AN_EMAIL]: `This should be a valid email address.`,
  [ErrorCode.NOT_AN_ADDRESS]: 'This should be a valid Algorand address.',
  [ErrorCode.NOT_AN_URL]: 'This should be a valid URL.',
  [ErrorCode.NOT_AN_OPTION]: 'This is not in the available options.',

  [ErrorCode.API_NOT_RESPONDING]: 'Algod API is not responding. Make sure your Node is up and running.',
  [ErrorCode.GITHUB_API_LIMIT_EXCEEDED]: `Cannot fetch the latest release from GitHub. API rate limits exceeded (60 req/hour).`,
}

export default strings;