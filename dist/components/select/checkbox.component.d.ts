import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterService } from '../../services';
import { SelectorServiceInjector, Selectable } from '../../services';
import { AfmSelectBase } from './select-base.component';
export declare class AfmCheckboxComponent extends AfmSelectBase implements OnInit {
    formControl: FormControl;
    sourceName: string;
    label: string;
    valueType: string;
    list: any[];
    rejects: any[];
    filter: FilterService;
    filteredData: Selectable[];
    width: string;
    selectedNames: string[];
    protected _value: any[];
    private _detaPrepared;
    value: any[];
    constructor(services: SelectorServiceInjector);
    ngOnInit(): void;
    onChange($event: any, val: any): void;
    allCheck(): void;
    allClear(): void;
    protected existsInSelector(val: any): boolean;
    writeValue(val: any): void;
}
