import { InjectionToken } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
export interface ErrorMessageFactoryService {
    create(error: ValidationErrors, name: string): string[];
}
export declare const ERROR_MESSAGE_FACTORY_SERVICE: InjectionToken<ErrorMessageFactoryService>;
export declare class NopeErrorMessageFactoryService implements ErrorMessageFactoryService {
    constructor();
    create(error: ValidationErrors, name: string): any[];
}
