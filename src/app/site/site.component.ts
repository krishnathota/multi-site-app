import { Component, inject, Injector, Input, OnInit } from '@angular/core';
import { customInject } from '../custom-inject';
import { DataService } from '../data.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
})
export class SiteComponent implements OnInit {
  @Input() siteId!: string;

  private dataService!: DataService;

  data: any;
  subData: any;

  private injector = inject(Injector);

  ngOnInit() {
    this.dataService = customInject(DataService, this.siteId, this.injector);
    this.data = this.dataService.getData();
    this.subData = this.dataService.getSubData();
  }
}
