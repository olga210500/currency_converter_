import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyType } from 'src/app/models/models';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})

export class ConverterComponent implements OnInit, OnDestroy {
  currencies !: string[];
  private subscription: Subscription | undefined;
  currentCurrency: string = CurrencyType.UAH;
  convertToCurrency: string = CurrencyType.USD;

  currentAmount = 1;
  convertedAmount!: number;
  conversionRate!: number;

  constructor(private currencyService: CurrencyService) {

  }
  ngOnInit(): void {
    this.getCurrencies();
    this.currencyService.getCurrentRate(this.currentCurrency, this.convertToCurrency).subscribe(res => {this.convertedAmount = res;
      this.conversionRate=res;
    });

  }
  getCurrencies(): void {
    this.subscription = this.currencyService.getCurrencies()
      .subscribe(currencies => {
        this.currencies = currencies
      }
      );
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  convertCurrency(currencyType: string, isConvertFromFirst: boolean) {
    if (isConvertFromFirst) {
      this.currentCurrency = currencyType;
      this.currencyService.getCurrentRate(this.currentCurrency, this.convertToCurrency).subscribe(res => { this.convertedAmount = this.currentAmount * res; this.conversionRate = res });
    } else {
      this.convertToCurrency = currencyType;
      this.currencyService.getCurrentRate(this.convertToCurrency, this.currentCurrency).subscribe(res => { this.currentAmount = this.convertedAmount * res; this.conversionRate = res });
    }

  }
  convertAmount(amount: number, isConvertFromFirst: boolean) {
    if (isConvertFromFirst && amount) {
      this.currentAmount = amount;
      this.convertedAmount = amount * this.conversionRate;
    } else if (!isConvertFromFirst && amount) {
      this.convertedAmount = amount;
      this.currentAmount = amount * this.conversionRate;
    }
    else if (isConvertFromFirst && !amount) {
      this.currentAmount=amount;
      this.convertedAmount = 0;
    }
    else {
      this.currentAmount = 0;
      this.convertedAmount = amount;

    }

  }
  swapCurrency(swapFrom:string,swapTo:string,amountFrom:number,amountTo:number):void{
    this.currentCurrency=swapTo;
    this.convertToCurrency=swapFrom;
    this.currentAmount =amountTo;
    this.convertedAmount=amountFrom;
  }
}
