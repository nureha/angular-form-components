import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'afm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AfmInputComponent),
    multi: true
  }]
})
export class AfmInputComponent implements OnInit, ControlValueAccessor {

  @Input() formControl: FormControl;
  @Input() label: string;
  @Input() type = 'text';
  @Input() set readonly(flag: boolean) {
    this._readonly = flag;
  }
  get readonly() {
    return this._readonly;
  }
  public required: boolean;
  private _readonly = false;

  constructor() {}

  ngOnInit() {
    const err = this.formControl.validator && this.formControl.validator(new FormControl());
    this.required = !!err && !!err['required'];
  }

  writeValue(_: any) {}
  registerOnChange(_: any) {}
  registerOnTouched(_: any) {}

}
