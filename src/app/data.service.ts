import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SiteServiceFactory } from './site-service-factory.service';
import { SubDataService } from './sub-data.service';
import { SITE_ID } from './tokens';

@Injectable()
export class DataService {
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
  private subDataService: SubDataService;

  private data: { [key: string]: any } = {
    site1: { message: 'Data for Site 1' + Math.random() },
    site2: { message: 'Data for Site 2' + Math.random() },
  };

  constructor(@Inject(SITE_ID) private siteId: string, private siteServiceFactory: SiteServiceFactory) {
    this.subDataService = this.siteServiceFactory.createService(SubDataService, this.siteId);
    this.setData(this.data[this.siteId]);
  }

  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.getValue();
  }

  getSubData() {
    return this.subDataService.getSubData();
  }
}
