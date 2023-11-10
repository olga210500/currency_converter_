import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyType } from 'src/app/models/models';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentRatesForUahUsd !: number;
  currentRatesForUahEur !: number;

  usdRateToUah !: number;
  eurRateToUah !: number;

  private usdRateSubscription: Subscription | undefined;
  private eurRateSubscription: Subscription | undefined;


  constructor(private currencyService: CurrencyService) {

  }

  ngOnInit(): void {

    this.getRateValues();


  }
  getRateValues(): void {
    this.usdRateSubscription = this.currencyService.getCurrentRate(CurrencyType.USD,CurrencyType.UAH).subscribe(value => this.usdRateToUah = value)
    this.eurRateSubscription = this.currencyService.getCurrentRate(CurrencyType.EUR,CurrencyType.UAH).subscribe(value => this.eurRateToUah = value)
  }
  ngOnDestroy(): void {
    this.usdRateSubscription?.unsubscribe();
    this.eurRateSubscription?.unsubscribe();
  }


}
