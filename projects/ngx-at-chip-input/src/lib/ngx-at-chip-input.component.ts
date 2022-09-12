import { ChangeDetectorRef, Component, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
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

  chipInput = new FormControl();
  chipList = new FormControl();

  constructor() { }

  ngOnInit() {
    this.chipList.setValue([]);
  }

  addChipHandler() {
    const chip = this.chipInput.value;
    const chipList = this.chipList.value;
    const chipListClone = chipList.slice();
    chipListClone.push(chip);
    this.chipList.setValue(chipListClone);
    this.chipInput.setValue('');
  }

  removeChipHandler(index) {
    const chipList: Array<string> = this.chipList.value;
    const chipListClone = chipList.slice();
    chipListClone.splice(index, 1);
    this.chipList.setValue(chipListClone);
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

}
