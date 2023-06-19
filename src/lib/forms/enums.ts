

export enum FieldType {
  STRING = 'string',
  NUMBER = 'number',
  EMAIL = 'email',
  URL = 'url',
  ADDRESS = 'address',
}


export enum ErrorCode {
  DEFAULT,
  REQUIRED,
  NOT_A_STRING,
  NOT_A_NUMBER,
  NOT_AN_EMAIL,
  NOT_AN_ADDRESS,
  NOT_AN_URL,
  NOT_AN_OPTION,
}



export enum FeedbackTag {
  BUG = 'bug', 
  QUESTION = 'question', 
  FEATURE = 'feature-request',
  COMMENT = 'comment', 
}
