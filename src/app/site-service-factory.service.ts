import { ClassProvider, Injectable, InjectionToken, Injector, StaticProvider, Type } from '@angular/core';
import { SITE_ID } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class SiteServiceFactory {
  constructor(private injector: Injector) {}

  createService<T>(service: Type<T> | InjectionToken<T>, siteId: string): T {
    const providers: StaticProvider[] = [
      { provide: SITE_ID, useValue: siteId },
      { provide: service, useClass: service as Type<T> } as ClassProvider,
    ];

    const customInjector = Injector.create({
      providers,
      parent: this.injector,
    });

    return customInjector.get(service);
  }
}
