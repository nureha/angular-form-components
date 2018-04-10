import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { SelectorServiceInjector, Selectable } from '../../services';
import { AfmSelectBase } from './select-base.component';

@Component({
  selector: 'afm-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AfmRadioComponent),
    multi: true
  },
    SelectorServiceInjector
  ]
})
export class AfmRadioComponent extends AfmSelectBase {

  @Input() formControl: FormControl;
  @Input() sourceName: string;
  @Input() label: string;
  @Input() valueType = 'number';
  @Input() list: any[] = [];
  @Input() rejects: any[] = [];

  constructor(
    services: SelectorServiceInjector
  ) {
    super(services);
  }

}
