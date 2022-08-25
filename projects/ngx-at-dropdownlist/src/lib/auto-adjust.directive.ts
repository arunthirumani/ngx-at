import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[libAutoAdjust]'
})
export class AutoAdjustDirective implements OnInit, AfterViewInit {

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const nativeElement = this.elRef.nativeElement;
    const rect = this.elRef.nativeElement.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      nativeElement.style.top = '-' + (nativeElement.offsetHeight - 5) + 'px';
    }
  }

}
