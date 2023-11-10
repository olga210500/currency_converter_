import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumericInput]',
})
export class NumericInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;
    const numericValue = inputValue.replace(/[^0-9.]/g, '');
    const dotCount = numericValue.split('.').length - 1;
    if (dotCount > 1) {
      inputElement.value = numericValue.replace(/\./g, '');
    } else {
      inputElement.value = numericValue;
    }
  }
}
