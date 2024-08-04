import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SITE_ID } from './tokens';

@Injectable()
export class SubDataService {
  private subDataSubject = new BehaviorSubject<any>(null);
  subData$ = this.subDataSubject.asObservable();

  private subData: { [key: string]: any } = {
    site1: { message: 'SubData for Site 1' },
    site2: { message: 'SubData for Site 2' },
  };

  constructor(@Inject(SITE_ID) private siteId: string) {
    this.setSubData(this.subData[this.siteId]);
  }

  setSubData(subData: any) {
    this.subDataSubject.next(subData);
  }

  getSubData() {
    return this.subDataSubject.getValue();
  }
}
