import { OnInit } from '@angular/core';
import { FormControl, ControlValueAccessor } from '@angular/forms';
export declare class AfmInputComponent implements OnInit, ControlValueAccessor {
    formControl: FormControl;
    label: string;
    type: string;
    readonly: boolean;
    required: boolean;
    private _readonly;
    constructor();
    ngOnInit(): void;
    writeValue(_: any): void;
    registerOnChange(_: any): void;
    registerOnTouched(_: any): void;
}
