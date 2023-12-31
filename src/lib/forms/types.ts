import type { ErrorCode } from "$lib/enums";
import type { FieldType } from "./enums";

export type FieldName = string;
export type FieldValue = string|number|boolean|undefined;
export type FieldValidation = (value: FieldValue) => boolean|FieldError;
export interface FieldProps {
  type: FieldType,
  validations?: FieldValidation[],
  defaultValue?: FieldValue,
  required?: boolean,
}

export interface FieldError {
  code?: ErrorCode,
  message?: string,
}

export type FormConfigs = Record<FieldName, FieldProps>
export type FormErrors = Record<FieldName, FieldError>;
export type FormValues = Record<FieldName, FieldValue>;