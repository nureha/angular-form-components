import { Injectable, Injector, InjectionToken, ReflectiveInjector, Inject, Provider } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export interface SelectorItem {
  name: string;
  value: string|number;
  default: boolean;
  sort?: string|number;
}

export abstract class Selectable {
  get forSelectName(): string { throw new Error('unimplemented'); }
  get forSelectValue(): any { throw new Error('unimplemented'); }
  get forSelectDefault(): boolean {
    return false;
  }
  get forSelectOrder(): any { throw new Error('unimplemented'); }
}

export interface SelectorService {
  list(): Observable<Selectable[]>;
  query(_: any): void;
}

export interface SelectorServiceMap {
  map: Map<string, SelectorService>;
}

export const MULTI_IMPORT_SERVICES_MAP = new InjectionToken<SelectorServiceMap>('MULTI_IMPORT_SERVICES_MAP');

@Injectable()
export class SelectorServiceInjector {

  private providers: SelectorService[];

  constructor(
    private injector: Injector,
    @Inject(MULTI_IMPORT_SERVICES_MAP) private services: SelectorServiceMap,
  ) {
    this.providers = Array.from(this.services.map.values());
  }

  get(name: string): any {
    const _class = this.services.map.get(name);
    if (_class) {
      const injector = ReflectiveInjector.resolveAndCreate(<any[]>this.providers, this.injector);
      return injector.get(_class);
    }
    throw new Error(`${name} is not provided!`);
  }

}
