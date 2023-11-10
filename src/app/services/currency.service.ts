import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiKey, currencyUrl } from '../constants/constants';
import { CurrencyType, IExchangeRateAllData, IExchangeRateOneCurrency } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  constructor(private http: HttpClient) {

  }
  getCurrencies(): Observable<string[]> {
    return this.getCurrentRates().pipe(
      map(res => Object.keys(res.conversion_rates))
    )
  }
  getCurrentRate(currencyType: string,convertTo: string): Observable<number> {

    return this.http.get<IExchangeRateOneCurrency>(currencyUrl + apiKey + '/pair/' + currencyType +'/'+ convertTo).pipe(
      map(res => res.conversion_rate)
    )

  }

  getCurrentRates(): Observable<IExchangeRateAllData> {
    return this.http.get<IExchangeRateAllData>(currencyUrl + apiKey + '/latest/' + CurrencyType.UAH)
  }



}
