import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'single-checkbox',
  templateUrl: './single-checkbox.component.html',
  styleUrls: ['./single-checkbox.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AfmSingleCheckboxComponent),
    multi: true
  }]
})
export class AfmSingleCheckboxComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() formControl: FormControl;
  @Input() label: string;
  @Input() trueValueLabel: string;
  @Input() set readonly(flag: boolean) {
    this._readonly = flag;
  }
  get readonly() {
    return this._readonly;
  }
  private _readonly = false;
  public required = false;
  private subscription = new Subscription();
  onChangePropagate: (_: any) => {};

  public readonlyFormControl = new FormControl();
  constructor() {}

  ngOnInit() {
    this.readonlyFormControl.disable();
    this.trueValueLabel = this.trueValueLabel ? this.trueValueLabel : this.label;
    const err = this.formControl.validator && this.formControl.validator(new FormControl());
    this.required = err && !!err['required'];
    this.subscription.add(this.formControl.valueChanges.pipe(filter(v => (!v && v !== false))).subscribe(_ => {
      this.onChangePropagate(false);
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  writeValue(v: any) {
    this.readonlyFormControl.patchValue(v);
  }
  registerOnChange(fn: any) {
    this.onChangePropagate = fn;
  }
  registerOnTouched(_: any) {}

}