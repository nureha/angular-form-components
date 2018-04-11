import { FormControl } from '@angular/forms';
import { SelectorServiceInjector, Selectable } from '../../services';
import { AfcSelectBase } from './select-base.component';
export declare class AfcSelectComponent extends AfcSelectBase {
    formControl: FormControl;
    sourceName: string;
    label: string;
    valueType: string;
    list: any[];
    rejects: any[];
    readonly: boolean;
    selected: Selectable;
    private _readonly;
    constructor(services: SelectorServiceInjector);
}
