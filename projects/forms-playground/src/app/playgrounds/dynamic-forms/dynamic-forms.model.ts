import { ValidatorFn, Validators } from "@angular/forms";

export interface DynamicOptions {
  label: string;
  value: string;
}
type CustomValidators = { banWords: ValidatorFn };
type ValidatorKeys = keyof Omit<typeof Validators & CustomValidators, 'prototype'  | 'compose' | 'composeAsync'>;
export interface DynamicControl<T = string> {
  controlType: 'input' | 'select';
  type?: string;
  label: string;
  value: T | null;
  options?: DynamicOptions[];
  validators?: {
    [key in ValidatorKeys]?: unknown;
  }
}
export interface DynamicFormConfig {
  description: string;
  controls: {
    [key: string]: DynamicControl;
  }
}
