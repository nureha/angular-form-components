import { Injectable, InjectionToken } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export interface ErrorMessageFactoryService {
    create(error: ValidationErrors, name: string): string[];
}
  
export const ERROR_MESSAGE_FACTORY_SERVICE = new InjectionToken<ErrorMessageFactoryService>('ERROR_MESSAGE_FACTORY_SERVICE');
  
@Injectable()
export class NopeErrorMessageFactoryService implements ErrorMessageFactoryService {
    constructor() {}
    create(error: ValidationErrors, name: string) {
        return [];
    }
}
