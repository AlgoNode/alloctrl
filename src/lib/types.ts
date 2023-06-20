/**
* General types
* ==================================================
*/

export type Payload = Record<string, any>;
export type PostData = Record<string, any>;
export type FetchParams = Record<string, any>;

export type LocaleDictionnary = 
  Record<string, string
    | Record<string, string
      | Record<string, string>
    >
  >; 
