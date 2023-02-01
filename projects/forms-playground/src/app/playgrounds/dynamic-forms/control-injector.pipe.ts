import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { CONTROL_DATA } from './control-data.token';
import { DynamicControl } from './dynamic-forms.model';

@Pipe({
  name: 'controlInjector',
  standalone: true
})
export class ControlInjectorPipe implements PipeTransform {

  injector = inject(Injector);

  transform(controlKey: string, config: DynamicControl): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: CONTROL_DATA,
          useValue: { controlKey, config }
        }
      ]
    });
  }

}
