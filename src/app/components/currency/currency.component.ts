import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  @Input() currenciesList !: string[];
  @Input() currentCurrency !: string;
  @Input() currentAmount!:number;
  @Output() setCurrencyType = new EventEmitter<string>();
  @Output() setAmount = new EventEmitter<number>();


  onChangeAmount(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.setAmount.emit(Number(newValue));
  }
  selectCurrencyType(event: MatSelectChange): void {
    const selectedOption = event.value;
    this.setCurrencyType.emit(selectedOption);
  }

}