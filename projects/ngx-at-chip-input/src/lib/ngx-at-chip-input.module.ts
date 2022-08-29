import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAtChipInputComponent } from './ngx-at-chip-input.component';



@NgModule({
  declarations: [NgxAtChipInputComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [NgxAtChipInputComponent]
})
export class NgxAtChipInputModule { }
