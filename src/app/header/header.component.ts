import { Component, Input } from '@angular/core';
import { Rate } from '../interfaces/rate.interface';

const DISPLAYED_CURRENCIES = ['USD', 'EUR'];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  @Input() rates: Rate[];

  get currencies(): Rate[] {
    if (!this.rates) return [];
    return this.rates.filter((rate: Rate) => DISPLAYED_CURRENCIES.indexOf(rate.cc) !== -1);
  }
}
