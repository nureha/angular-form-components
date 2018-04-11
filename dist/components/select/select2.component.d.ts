import { ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectorServiceInjector, Selectable } from '../../services';
import { AfcSelectBase } from './select-base.component';
export declare class AfcSelect2Component extends AfcSelectBase implements OnInit, AfterViewInit, OnDestroy {
    formControl: FormControl;
    sourceName: string;
    label: string;
    valueType: string;
    list: any[];
    rejects: any[];
    placeholder: string;
    readonly: boolean;
    private _readonly;
    selected: Selectable;
    selector: ElementRef;
    data: Selectable[];
    private _data;
    private element;
    private valueTrigger$;
    private preparedElement$;
    protected _value: any;
    private mySubscriptions;
    onChangePropagate: any;
    constructor(service: SelectorServiceInjector);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private renderSelect2();
}
