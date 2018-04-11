import { FormControl } from '@angular/forms';
import { SelectorServiceInjector } from '../../services';
import { AfcSelectBase } from './select-base.component';
export declare class AfcRadioComponent extends AfcSelectBase {
    formControl: FormControl;
    sourceName: string;
    label: string;
    valueType: string;
    list: any[];
    rejects: any[];
    constructor(services: SelectorServiceInjector);
}
