import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss']
})
export class ChipInputComponent implements OnInit {

  chipList = new FormControl();
  chipListFormValue;
  chipArray = ['Hydrogen', 'Helium', 'Lithium', 'Berilium'];
  chipInputEmittedData;

  constructor() { }

  ngOnInit() {
    this.subscribeToFormChanges();
    this.chipList.setValue(['test1', 'chip1', 'another chip']);
  }

  subscribeToFormChanges() {
    this.chipList.valueChanges.subscribe(value=>{
      this.chipListFormValue = value;
    });
  }

  chipListChangeHandler(data) {
    this.chipInputEmittedData = data;
  }

}
