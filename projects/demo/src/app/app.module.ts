import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxAtDropdownlistModule } from 'ngx-at-dropdownlist';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAtDropdownlistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
