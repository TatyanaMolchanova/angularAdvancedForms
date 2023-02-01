import { Injectable, Type } from '@angular/core';
import { DynamicInputComponent } from './dynamic-controls/dynamic-input.component';
import { DynamicSelectComponent } from './dynamic-controls/dynamic-select.component';
import { DynamicControl } from './dynamic-forms.model';

type DynamicControlsMap = {
  [T in DynamicControl['controlType']]: Type<any>;
};

@Injectable({
  providedIn: 'root'
})
export class DynamicControlResolver {
  private controlComponents: DynamicControlsMap = {
    input: DynamicInputComponent,
    select: DynamicSelectComponent
  }
  resolve(controlType: keyof DynamicControlsMap) {
    return this.controlComponents[controlType];
  }
}
