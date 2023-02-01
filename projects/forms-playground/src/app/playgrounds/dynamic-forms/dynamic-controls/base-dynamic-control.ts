import { Directive, inject } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import { CONTROL_DATA } from "../control-data.token";

@Directive()
export class BaseDynamicControl {
  control = inject(CONTROL_DATA);
  get formGroup() {
    return this.parentFormGroup.control as FormGroup;
  }
  private parentFormGroup = inject(ControlContainer);
}
