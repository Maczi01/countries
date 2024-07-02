import { Component, Input } from '@angular/core';
import { Country } from '../../types/Country';

@Component({
  selector: 'app-country-card',
  standalone: true,
  templateUrl: './country-card.component.html',
})
export class CountryCardComponent {
  @Input() country!: Country;

  get firstCurrencyKey(): string | null {
    return this.country?.currencies ? Object.keys(this.country.currencies)[0] : null;
  }

  get firstCurrency(): { name: string, symbol: string } | null {
    return this.country?.currencies && this.firstCurrencyKey ? this.country.currencies[this.firstCurrencyKey] : null;
  }
}
