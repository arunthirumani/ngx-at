import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'ngx-at-chip-input',
  templateUrl: './ngx-at-chip-input.component.html',
  styleUrls: ['./ngx-at-chip-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxAtChipInputComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NgxAtChipInputComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class NgxAtChipInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'Type here and press enter...';
  @Input() chipArray;
  @Output() chipListChange = new EventEmitter();
  @Output() chipArrayChange = new EventEmitter();
  chipInput = new FormControl();
  chipList = new FormControl();

  constructor() { }

  ngOnInit() {
    this.chipList.setValue([]);
  }

  addChipHandler() {
    if (this.chipArray) {
      this.addChipToArray();
    } else {
      this.addChipToFormControl();
    }
  }

  removeChipHandler(index) {
    if (this.chipArray) {
      this.removeInArray(index);
    } else {
      this.removeInFormControl(index);
    }
  }

  writeValue(value) {
    if (value) {
      this.chipList.setValue(value);
    } else {
      this.chipList.setValue([]);
    }
  }

  registerOnChange(fn) {
    this.chipList.valueChanges.subscribe((value) => {
      fn(value);
    });
  }

  setDisabledState(isDisabled) {
    if (isDisabled) {
      this.chipInput.disable();
      this.chipList.disable();
    } else {
      this.chipList.enable();
      this.chipList.enable();
    }
  }

  validate(): ValidationErrors | null {
    return null;
  }

  registerOnTouched(fn) {
  }

  addChipToFormControl() {
    if (this.chipList.disabled || !this.chipInput.value) {
      return;
    }
    const chip = this.chipInput.value;
    const chipList = this.chipList.value;
    const chipListClone = chipList.slice();
    chipListClone.push(chip);
    this.chipList.setValue(chipListClone);
    this.chipInput.setValue('');
  }

  addChipToArray() {
    if (this.chipInput.value) {
      this.chipArray.push(this.chipInput.value);
      this.chipListChange.emit(this.chipArray);
      this.chipArrayChange.emit(this.chipArray.slice());
    }
  }

  removeInFormControl(index) {
    if (this.chipList.disabled) {
      return;
    }
    const chipList: Array<string> = this.chipList.value;
    const chipListClone = chipList.slice();
    chipListClone.splice(index, 1);
    this.chipList.setValue(chipListClone.slice());
  }

  removeInArray(index) {
    if (!this.chipArray || !this.chipArray.length) {
      return;
    }
    this.chipArray.splice(index, 1);
    this.chipListChange.emit(this.chipArray.slice());
    this.chipArrayChange.emit(this.chipArray.slice());
  }

}
