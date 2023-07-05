


export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export enum PropType {
  BLOCK = 'block',
  ADDRESS = 'address',
}



/**
 * UI & Styles
 * ==================================================
 */
export enum Theme {
  AUTO = 'auto',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum Styles {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GRAY = 'gray',
  OUTLINE = 'outline',
  GHOST = 'ghost',
  REVERSED = 'reversed',
}

export enum Sizes {
  TINY = 'tiny',
  SMALL = 'small',
  REGULAR = 'regular',
  LARGE = 'large',
  HUGE = 'huge',
}



/**
* Error codes 
* ==================================================
*/
export enum ErrorCode {
  DEFAULT,
  REQUIRED,
  NOT_A_STRING,
  NOT_A_NUMBER,
  NOT_AN_EMAIL,
  NOT_AN_ADDRESS,
  NOT_AN_URL,
  NOT_AN_OPTION,
  API_NOT_RESPONDING,
}
