import { FormControl } from '@angular/forms';
import { SelectorServiceInjector } from '../../services';
import { AfmSelectBase } from './select-base.component';
export declare class AfmRadioComponent extends AfmSelectBase {
    formControl: FormControl;
    sourceName: string;
    label: string;
    valueType: string;
    list: any[];
    rejects: any[];
    constructor(services: SelectorServiceInjector);
}
