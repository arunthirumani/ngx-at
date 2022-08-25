import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAtDropdownlistComponent } from './ngx-at-dropdownlist.component';
import { AutoAdjustDirective } from './auto-adjust.directive';



@NgModule({
  declarations: [NgxAtDropdownlistComponent, AutoAdjustDirective],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [NgxAtDropdownlistComponent]
})
export class NgxAtDropdownlistModule { }
