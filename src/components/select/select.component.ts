import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { filter, combineLatest } from 'rxjs/operators';

import { SelectorServiceInjector, Selectable } from '../../services';
import { AfmSelectBase } from './select-base.component';

@Component({
  selector: 'afm-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AfmSelectComponent),
    multi: true
  },
    SelectorServiceInjector
  ]
})
export class AfmSelectComponent extends AfmSelectBase {

  @Input() formControl: FormControl;
  @Input() sourceName: string;
  @Input() label: string;
  @Input() valueType = 'number';
  @Input() list: any[] = [];
  @Input() rejects: any[] = [];
  @Input() set readonly(flag: boolean) {
    this._readonly = flag;
  }
  get readonly() {
    return this._readonly;
  }
  public selected: Selectable = null;
  private _readonly = false;

  constructor(
    services: SelectorServiceInjector
  ) {
    super(services);
    this.dataPrepared$.pipe(
      filter(v => !!v),
      combineLatest(this.innerFormControl.valueChanges)
    ).subscribe(v => {
      this.selected = this.data.find(d => d.forSelectValue === v[1]);
    });
  }

}
