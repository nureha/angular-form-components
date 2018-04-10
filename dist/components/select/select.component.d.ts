import { FormControl } from '@angular/forms';
import { SelectorServiceInjector, Selectable } from '../../services';
import { AfmSelectBase } from './select-base.component';
export declare class AfmSelectComponent extends AfmSelectBase {
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
