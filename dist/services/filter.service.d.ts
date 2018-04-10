import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
export declare class FilterService {
    private ob;
    private _target;
    private _type;
    readonly onChange: Observable<any>;
    private action$;
    private _val;
    private _regExp;
    private _onChange;
    private _and;
    private _or;
    static match(form: AbstractControl, target: string): FilterService;
    static equal(form: AbstractControl, target: string): FilterService;
    static graterThan(form: AbstractControl, target: string): FilterService;
    static over(form: AbstractControl, target: string): FilterService;
    static lessThan(form: AbstractControl, target: string): FilterService;
    static under(form: AbstractControl, target: string): FilterService;
    constructor(ob: Observable<any>, _target: string, _type: string);
    private check(item);
    private checkAll(item);
    trigger(): void;
    filter<T>(list: T[]): T[];
    and(s: FilterService): this;
    or(s: FilterService): this;
}
