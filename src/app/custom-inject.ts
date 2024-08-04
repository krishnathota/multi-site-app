import { InjectionToken, InjectOptions, Injector, Type } from '@angular/core';
import { SiteServiceFactory } from './site-service-factory.service';

export const SITE_ID = new InjectionToken<string>('SITE_ID');

export function customInject<T>(
  token: Type<T> | InjectionToken<T>,
  siteId: string,
  injector: Injector,
  options?: InjectOptions,
  notFoundValue?: T
): T {
  const { ...injectOptions } = options || {};

  if (siteId) {
    const siteServiceFactory = injector.get(SiteServiceFactory);
    const service = siteServiceFactory.createService(token as Type<T>, siteId);
    if (!service) {
      throw new Error(`Service for token ${token} with siteId ${siteId} could not be created.`);
    }
    return service;
  } else {
    const service = injector.get(token, notFoundValue ?? undefined, injectOptions);
    if (!service) {
      throw new Error(`Service for token ${token} could not be found.`);
    }
    return service;
  }
}
