import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-at-chip-input',
  templateUrl: './ngx-at-chip-input.component.html',
  styleUrls: ['./ngx-at-chip-input.component.scss']
})
export class NgxAtChipInputComponent implements OnInit {

  chipInput = new FormControl();
  chipList = new FormControl();

  constructor() { }

  ngOnInit() {
    this.chipList.setValue(['test1', 'long string', 'test2']);
  }

  addChipHandler() {
    const chip = this.chipInput.value;
    const chipList = this.chipList.value;
    chipList.push(chip);
    this.chipInput.setValue('');
  }

  removeChipHandler(index) {
    const chip = this.chipInput.value;
    const chipList: Array<string> = this.chipList.value;
    chipList.splice(index, 1);
  }

}
