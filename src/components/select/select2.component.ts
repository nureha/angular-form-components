import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { filter, combineLatest, delay } from 'rxjs/operators';

import { SelectorServiceInjector, Selectable } from '../../services';
import { AfmSelectBase } from './select-base.component';
declare const jQuery: any;

@Component({
  selector: 'afm-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AfmSelect2Component),
    multi: true
  },
    SelectorServiceInjector
  ]
})
export class AfmSelect2Component extends AfmSelectBase implements OnInit, AfterViewInit, OnDestroy {

  @Input() formControl: FormControl;
  @Input() sourceName: string;
  @Input() label: string;
  @Input() valueType = 'number';
  @Input() list: any[];
  @Input() rejects: any[] = [];
  @Input() placeholder = '';
  @Input() set readonly(flag: boolean) {
    this._readonly = flag;
  }
  get readonly() {
    return this._readonly;
  }
  private _readonly = false;
  public selected: Selectable = null;
  @ViewChild('selector') selector: ElementRef;
  set data(data: Selectable[]) {
    this._data = data;
    this.renderSelect2();
  }
  get data() {
    return this._data;
  }
  private _data: Selectable[] = [];
  private element: any;
  private valueTrigger$ = new Subject();
  private preparedElement$ = new Subject();
  protected _value: any;
  private mySubscriptions = new Subscription();

  onChangePropagate: any = () => {};

  constructor(service: SelectorServiceInjector) {
    super(service);
    this.mySubscriptions.add(
      this.dataPrepared$.pipe(
        combineLatest(this.preparedElement$),
        filter(v => !!v[0] && !!v[1]),
        combineLatest(this.valueTrigger$),
        delay(0)
      ).subscribe(v => {
        if (this.element) {
          this.element.val(v[1]).trigger('change').trigger('select2:select');
        }
        this.selected = this._data.find(d => d.forSelectValue === v[1]);
      })
    );
  }

  ngAfterViewInit() {
    if (this.selector) {
      this.element = jQuery(this.selector.nativeElement);
      this.renderSelect2();
      this.element.on('select2:select', () => {
        let val = this.selector.nativeElement.value;
        // FIXME 文字列だけど数字だけの値を扱うこともあるかもしれない・・・
        if (/^[0-9]+$/.test(val)) {
          val = parseInt(val, 10);
        }
        if (this._value !== val) {
          if (this.valueType === 'object') {
            val = this.data.find(l => l.forSelectValue === val);
          }
          this._value = val;
          this.onChangePropagate(val);
        }
      });
    }
    this.preparedElement$.next(true);
    // default値設定のときだけ
    this.mySubscriptions.add(
      this.innerFormControl.valueChanges.subscribe(v => {
        this.valueTrigger$.next(v);
      })
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.mySubscriptions.unsubscribe();
    if (this.element) {
      this.element.off('select2:select');
    }
  }

  private renderSelect2() {
    if (!this.element) {
      return;
    }
    if (this.element.hasClass('select2-hidden-accessible') === true) {
      this.element.select2('destroy');
      this.element.html('');
    }
    this.element.select2({
      data: this._data.map(d => {
        return { id: d.forSelectValue, text: d.forSelectName };
      }),
      theme: 'bootstrap',
      placeholder: this.placeholder,
      allowClear: !this._required
    });
    this.valueTrigger$.next(this.formControl.value);
  }

}
