import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChipInputComponent } from './chip-input/chip-input.component';


const routes: Routes = [
  {
    path: 'chip-input',
    component: ChipInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
