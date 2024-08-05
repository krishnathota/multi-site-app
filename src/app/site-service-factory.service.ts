import { ClassProvider, inject, Injectable, InjectionToken, Injector, StaticProvider, Type } from '@angular/core';
import { SITE_ID } from './tokens';

interface ServiceCacheEntry<T> {
  siteId: string;
  instance: T;
}

@Injectable({
  providedIn: 'root',
})
export class SiteServiceFactory {
  private injector = inject(Injector);

  private cache = new Map<string, ServiceCacheEntry<any>>();

  createService<T>(service: Type<T> | InjectionToken<T>, siteId: string): T {
    const cacheKey = `${service.toString()}_${siteId}`;
    const cachedEntry = this.cache.get(cacheKey);

    if (cachedEntry) {
      return cachedEntry.instance;
    }

    const providers: StaticProvider[] = [
      { provide: SITE_ID, useValue: siteId },
      { provide: service, useClass: service as Type<T> } as ClassProvider,
    ];

    const customInjector = Injector.create({
      providers,
      parent: this.injector,
    });

    const instance = customInjector.get(service);
    this.cache.set(cacheKey, { siteId, instance });

    return instance;
  }
}
