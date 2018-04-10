import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'afm-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AfmTextareaComponent),
    multi: true
  }]
})
export class AfmTextareaComponent implements OnInit, ControlValueAccessor {

  @Input() formControl: FormControl;
  @Input() label: string;
  public required: boolean;

  constructor() {}

  ngOnInit() {
    const err = this.formControl.validator && this.formControl.validator(new FormControl());
    this.required = err && !!err['required'];
  }

  writeValue(_: any) {}
  registerOnChange(_: any) {}
  registerOnTouched(_: any) {}

}
