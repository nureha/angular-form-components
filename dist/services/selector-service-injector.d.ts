import { Injector, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export interface SelectorItem {
    name: string;
    value: string | number;
    default: boolean;
    sort?: string | number;
}
export declare abstract class Selectable {
    readonly forSelectName: string;
    readonly forSelectValue: any;
    readonly forSelectDefault: boolean;
    readonly forSelectOrder: any;
}
export interface SelectorService {
    list(): Observable<Selectable[]>;
    query(_: any): void;
}
export interface SelectorServiceMap {
    map: Map<string, SelectorService>;
}
export declare const MULTI_IMPORT_SERVICES_MAP: InjectionToken<SelectorServiceMap>;
export declare class SelectorServiceInjector {
    private injector;
    private services;
    private providers;
    constructor(injector: Injector, services: SelectorServiceMap);
    get(name: string): any;
}
