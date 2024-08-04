import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { SiteServiceFactory } from './site-service-factory.service';
import { SiteComponent } from './site/site.component';

@NgModule({
  declarations: [AppComponent, SiteComponent],
  imports: [BrowserModule],
  providers: [SiteServiceFactory, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
