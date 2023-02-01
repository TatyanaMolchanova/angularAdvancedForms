import { InjectionToken } from "@angular/core";
import { DynamicControl } from "./dynamic-forms.model";

export interface ControlData {
  controlKey: string;
  config: DynamicControl;
}

export const CONTROL_DATA = new InjectionToken<ControlData>('Control Data');
