export enum CurrencyType {
    UAH = 'UAH',
    USD = 'USD',
    EUR = 'EUR'
}
export interface IExchangeRateData {
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    base_code: string;
}

export interface IExchangeRateAllData extends IExchangeRateData {
    conversion_rates: { [currencyCode: string]: number };
}

export interface IExchangeRateOneCurrency extends IExchangeRateData {
    conversion_rate: number;
}