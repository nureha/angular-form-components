import { Component, Input, forwardRef, OnInit, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { filter, combineLatest, delay } from 'rxjs/operators';

import { FilterService } from '../../services';
import { SelectorServiceInjector, Selectable } from '../../services';
import { AfmSelectBase } from './select-base.component';

@Component({
  selector: 'afm-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AfmCheckboxComponent),
    multi: true
  },
    SelectorServiceInjector
  ]
})
export class AfmCheckboxComponent extends AfmSelectBase implements OnInit {

  @Input() formControl: FormControl;
  @Input() sourceName: string;
  @Input() label: string;
  @Input() valueType = 'number';
  @Input() list: any[] = [];
  @Input() rejects: any[] = [];
  @Input() filter: FilterService;
  public filteredData: Selectable[] = [];
  public width = '';
  public selectedNames: string[] = [];
  protected _value: any[];
  private _detaPrepared = false;

  get value() {
    return this._value instanceof Array ? this._value : [this._value];
  }
  set value(value) {
    this._value = value instanceof Array ? value : value !== null ? [value] : [];
    this.onChangePropagate(this.value);
    this.selectedNames = this.data.filter(l => this._value.indexOf(l.forSelectValue) !== -1).map(l => l.forSelectName);
  }

  constructor(
    services: SelectorServiceInjector
  ) {
    super(services);
    this.dataPrepared$.subscribe(v => this._detaPrepared = !!v);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.filter) {
      this.subscriptions.add(this.dataPrepared$
      .pipe(
        filter(v => !!v),
        combineLatest(this.filter.onChange),
        delay(0)
      )
      .subscribe(v => {
        this.filteredData = this.filter.filter(this.data);
        // FIXME for magic number
        if (this.filteredData.length > 9) {
          this.width = (this.filteredData.reduce((prev, d) => {
            // 実際の文字数より多い数が返る可能性があるが厳密な数値は必要ではないし、長い分には問題ない
            return prev < d.forSelectName.length ? d.forSelectName.length : prev;
          }, 0) * 15).toString() + 'px';
        }
      }));
      this.filter.trigger();
    } else {
      this.subscriptions.add(this.dataPrepared$
      .pipe(filter(v => !!v))
      .subscribe(v => {
        this.filteredData = this.data.filter(_ => true);
      }));
    }
    // HACK: キャッシュから読む場合など↑でsubscribeする前にnextされてしまってる場合への対処
    if (this._detaPrepared) {
      this.dataPrepared$.next(true);
    }
  }

  onChange($event, val): void {
    if ($event.target.checked) {
      if (this.valueType === 'object') {
        val = this.data.find(l => l.forSelectValue === val);
      }
      this.value = [
        ...this.value.filter(v => !!v),
        val
      ];
    } else {
      if (this.valueType === 'object') {
        this.value = this.value.filter(v => !!v && v.value !== val);
      } else {
        this.value = this.value.filter(v => v !== val);
      }
    }
  }

  allCheck() {
    this.value = [
      ...this._value,
      ...this.filteredData.filter(d => this._value.indexOf(d.forSelectValue) === -1).map(d => d.forSelectValue)
    ];
  }

  allClear() {
    const filteredDataArray = this.filteredData.map(d => d.forSelectValue);
    this.value = this._value.filter(v => filteredDataArray.indexOf(v) === -1);
  }

  protected existsInSelector(val): boolean {
    const _val = (!val || val instanceof Array) ? val : [val];
    return !_val || !_val.length || _val.reduce((prev, curr) => {
      return prev || this.data.some(item => item.forSelectValue === curr);
    }, false);
  }

  writeValue(val) {
    this._value = val;
    this.innerFormControl.patchValue(val);
  }

}
