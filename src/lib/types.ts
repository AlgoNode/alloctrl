/**
* General types
* ==================================================
*/

import type { PropType } from "./enums";

export type Payload = Record<string, any>;
export type PostData = Record<string, any>;
export type FetchParams = Record<string, any>;

export type PropLabel = string;
export type PropValue = string|number|undefined;
export type PropsList = {
  label: PropLabel,
  value: PropValue,
  type?: PropType,
}[];

export type LocaleDictionnary = 
  Record<string, string
    | Record<string, string
      | Record<string, string>
    >
  >; 

