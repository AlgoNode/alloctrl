import type { Writable, Readable } from "svelte/store";
import type { FormConfigs, FormErrors, FormValues } from "./types";
import { ErrorCode } from "$lib/enums";
import { derived, get, writable } from "svelte/store";
import { isRequired, typeValidation } from "./validations";
import BaseModule from "$lib/BaseModule";



class Form extends BaseModule {
  private fields: FormConfigs = {}
  public data: Writable<FormValues> = writable({});
  public errors: Writable<FormErrors> = writable({});
  public hasErrors: Readable<boolean>;


  constructor(fields: FormConfigs) {
    super();
    this.fields = fields;
    this.addDefaults();
    this.hasErrors = derived(this.errors, this.hasErrorValues);
  }


  /**
  * Defaults
  * ==================================================
  */
  private addDefaults() {
    Object.entries(this.fields).forEach(([field, props]) => {
      if (!props.validations) props.validations = [];
      props.validations = [
        ...(props.required ? [isRequired] : []),
        ...typeValidation[props.type],
        ...(props?.validations || []),
      ];
    });
    this.reset();
  }
  
  public reset() {
    this.errors.set({});
    const defaultData: FormValues = {};
    Object.entries(this.fields).forEach(([field, props]) => {
      if (props.defaultValue) defaultData[field] = props.defaultValue; 
    });
    this.data.set(defaultData);
  }

  /**
  * Validate
  * ==================================================
  */
  public validate() {
    const data = get(this.data);
    this.errors.set({});
    const errors: FormErrors = {};
    Object.entries(this.fields).forEach(([field, props]) => {
      if (!props.validations?.length) return;
      const value = data[field];
      for(let i=0; i<props.validations.length; i++){
        const validate = props.validations[i];
        const result = validate(value);
        if (result === true) continue;
        errors[field] = result || { code: ErrorCode.DEFAULT };
        break;
      }
    });
    this.errors.set(errors);
    return !this.hasErrorValues(errors);
  }


  /**
  * Errors
  * ==================================================
  */
  private hasErrorValues(errors: FormErrors) {
    return !!Object.keys(errors).length
  }

}


export default Form;