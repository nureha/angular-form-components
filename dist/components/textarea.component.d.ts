import { OnInit } from '@angular/core';
import { FormControl, ControlValueAccessor } from '@angular/forms';
export declare class AfcTextareaComponent implements OnInit, ControlValueAccessor {
    formControl: FormControl;
    label: string;
    required: boolean;
    constructor();
    ngOnInit(): void;
    writeValue(_: any): void;
    registerOnChange(_: any): void;
    registerOnTouched(_: any): void;
}
