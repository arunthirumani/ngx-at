import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'lib-ngx-at-dropdownlist',
  templateUrl: './ngx-at-dropdownlist.component.html',
  styleUrls: ['./ngx-at-dropdownlist.component.scss']
})
export class NgxAtDropdownlistComponent implements OnInit {

  @Input() dataList = ['apple', 'banana', 'carrot'];
  @Input() textField;
  @Input() valueField;
  @Input() label;
  @Input() required;
  @Input() filterable;
  @Output() valueChange = new EventEmitter();
  @Output() filterChange = new EventEmitter();
  displayList = false;
  documentClickEventListener;
  actionKeyListener;
  TAB_KEYCODE = 9;
  ESCAPE_KEYCODE = 27;
  ENTER_KEYCODE = 13;
  UP_ARROW = 38;
  DOWN_ARROW = 40;
  LEFT_ARROW = 37;
  RIGHT_ARROW = 39;
  displayErrorOnInit = true;
  charKeyPressListener: any;
  arrowKeyListener: any;
  selectedItem = new FormControl();
  filter = new FormControl();
  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    if (this.required) {
      this.selectedItem.setValidators(Validators.required);
      this.selectedItem.updateValueAndValidity();
      if (this.displayErrorOnInit) {
        this.selectedItem.markAsTouched();
      }
    }
    if (this.filterable) {
      this.subscribeToFilterChange();
    }
  }

  dropdownClickHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    this.toggleList();
    if (this.displayList) {
      this.addEventListeners();
    } else {
      this.removeEventListeners();
    }
  }

  toggleList() {
    this.displayList = !this.displayList;
  }

  listItemClickHandler(data, event) {
    event.stopPropagation();
    this.selectedItem.setValue(data);
    this.emitValue(data);
    this.toggleList();
    this.removeEventListeners();
  }

  addEventListeners() {
    this.addDocumentClickListener();
    this.addActionKeyListener();
    if (!this.filterable) {
      this.addCharKeyListener();
    }
    this.addArrowKeyListener();
  }


  removeEventListeners() {
    if (this.documentClickEventListener) {
      document.body.removeEventListener('mousedown', this.documentClickEventListener);
    }
    if (this.actionKeyListener) {
      document.removeEventListener('keyup', this.actionKeyListener);
    }
    if (this.charKeyPressListener) {
      document.removeEventListener('keyup', this.charKeyPressListener);
    }
  }

  addDocumentClickListener() {
    const documentClickEventListener = function clickHandler(event) {
      if (!this.isDropDownClicked(event) && !this.isMouseDownOnScroll(event)) {
        this.toggleList();
        this.removeEventListeners();
      }
    };

    this.documentClickEventListener = documentClickEventListener.bind(this);
    document.body.addEventListener('mousedown', this.documentClickEventListener);
  }

  addActionKeyListener() {
    const actionKeyListener = function escListener(event) {
      if (!event) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (event.keyCode === this.ESCAPE_KEYCODE || event.keyCode === this.ENTER_KEYCODE) {
        this.toggleList();
        this.removeEventListeners();
      }
    };

    this.actionKeyListener = actionKeyListener.bind(this);
    document.addEventListener('keyup', this.actionKeyListener);
  }

  addArrowKeyListener() {
    const arrowListener = function arrowKeyListener(event) {
      if (!event) {
        return;
      }
      if (event.keyCode === this.TAB_KEYCODE) {
        return;
      }
      if (event.keyCode === this.UP_ARROW || event.keyCode === this.LEFT_ARROW) {
        this.selectPrevious();
        this.preventEventPropagation();
      } else if (event.keyCode === this.RIGHT_ARROW || event.keyCode === this.DOWN_ARROW) {
        this.selectNext();
        this.preventEventPropagation();
      }
    };

    this.arrowKeyListener = arrowListener.bind(this);
    document.addEventListener('keydown', this.arrowKeyListener);
  }

  addCharKeyListener() {
    function keyInputListener(event) {
      if (!event) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (event && event.keyCode >= 65 && event.keyCode <= 90) {
        const searchChar = event.key;
        const searchedItem = this.dataList.find(item => {
          const firstChar = this.textField ? item[this.textField].charAt(0) : item.charAt(0);
          return firstChar.localeCompare(searchChar, undefined, { sensitivity: 'base' }) === 0;
        });
        if (searchedItem) {
          this.selectedItem.setValue(searchedItem);
        }
      }
    }
    const bindedFunc = keyInputListener.bind(this);
    this.charKeyPressListener = (function throttle() {
      let flag = false;
      return function chekcAndInvokeCallback(event) {
        if (!flag) {
          flag = true;
          bindedFunc(event);
          setTimeout(() => {
            flag = false;
          }, 500);
        }
      };
    })();
    document.addEventListener('keyup', this.charKeyPressListener);
  }

  focusHandler(event) {
    event.stopPropagation();
    this.addArrowKeyListener();
  }

  blurHandler() {
    document.removeEventListener('keydown', this.arrowKeyListener);
  }

  mouseDownHandler(event) {
    event.preventDefault();
  }

  isDropDownClicked(event) {
    return this.elementRef.nativeElement.contains(event.target);
  }

  isMouseDownOnScroll(event) {
    return event.offsetX > event.target.clientWidth || event.offsetY > event.target.clientHeight;
  }

  emitValue(data) {
    if (this.valueField) {
      this.valueChange.emit(data[this.valueField]);
    } else {
      this.valueChange.emit(data);
    }
  }

  selectNext() {
    const currentIndex = this.dataList.findIndex(item => item === this.selectedItem.value);
    if (currentIndex === this.dataList.length - 1) {
      return;
    }
    this.selectedItem.setValue(this.dataList[currentIndex + 1]);
    this.emitValue(this.selectedItem.value);
  }

  selectPrevious() {
    const currentIndex = this.dataList.findIndex(item => item === this.selectedItem.value);
    if (currentIndex === 0) {
      return;
    }
    this.selectedItem.setValue(this.dataList[currentIndex - 1]);
    this.emitValue(this.selectedItem.value);
  }

  preventEventPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  subscribeToFilterChange() {
    // this.filter.valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     distinctUntilChanged())
    //   .subscribe(value => {
    //     this.filterChange.emit(value);
    //   });
  }

  writeValue(data: any) {
    if (this.valueField) {
      const dataObject = this.dataList.find(item => item[this.valueField] === data);
      this.selectedItem.patchValue(dataObject);
    } else {
      this.selectedItem.patchValue(data);
    }
  }

  registerOnChange(fn: any) {
    this.selectedItem.valueChanges.subscribe(item => {
      this.valueField && item ? fn(item[this.valueField]) : fn(item);
    });
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.selectedItem.disable();
    } else {
      this.selectedItem.enable();
    }
  }


  validate(): ValidationErrors | null {
    return this.selectedItem.valid ? null : { invalidDropdown: { valid: false } };
  }

  registerOnTouched(fn: any): void { }

}
