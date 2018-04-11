import { OnInit, AfterViewInit, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { FormControl, ControlValueAccessor } from '@angular/forms';
export declare class AfcNumberComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    private renderer;
    private elm;
    formControl: FormControl;
    label: string;
    type: string;
    afterPointNum: number;
    readonly: boolean;
    blur: EventEmitter<{}>;
    innerType: string;
    required: boolean;
    innerFormControl: FormControl;
    readonly formatedValue: string;
    private _readonly;
    private realInput;
    private dummyInput;
    onChangePropagate: any;
    onKeyDown(key: any): void;
    constructor(renderer: Renderer2, elm: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onBlur(noEmit?: boolean): void;
    onFocus(): void;
    writeValue(value: number): void;
    registerOnChange(fn: any): void;
    registerOnTouched(_: any): void;
}
