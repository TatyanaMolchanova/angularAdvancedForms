import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OptionComponent } from './option/option.component';


@NgModule({
  declarations: [
    SelectComponent,
    OptionComponent
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    SelectComponent,
    OptionComponent
  ]
})
export class SelectModule { }
