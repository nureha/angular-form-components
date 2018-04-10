import { OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
export declare class AfmSingleCheckboxComponent implements OnInit, OnDestroy, ControlValueAccessor {
    formControl: FormControl;
    label: string;
    trueValueLabel: string;
    readonly: boolean;
    private _readonly;
    required: boolean;
    private subscription;
    onChangePropagate: (_: any) => {};
    readonlyFormControl: FormControl;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(_: any): void;
}
