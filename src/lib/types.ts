/**
* General types
* ==================================================
*/

export type Props = Record<string, any>;
export type LocaleDictionnary = Record<
  string, string|Record<
    string, string|Record<string, string>
  >
>; 
