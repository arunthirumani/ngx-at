import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxAtDropdownlistModule } from 'ngx-at-dropdownlist';
import { ChipInputComponent } from './chip-input/chip-input.component';
import { NgxAtChipInputModule } from 'ngx-at-chip-input';

@NgModule({
  declarations: [
    AppComponent,
    ChipInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAtDropdownlistModule,
    NgxAtChipInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
