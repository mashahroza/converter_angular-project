import { Component, OnDestroy, OnInit } from '@angular/core';
import { RatesService } from './rates.service';
import { Rate } from './interfaces/rate.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  rates: Rate[];
  private ratesSubscription: Subscription;

  constructor(private ratesService: RatesService) {}

  ngOnInit(): void {
    this.setRates();
    setInterval(() => {
      this.setRates();
    }, 60000);
  }

  setRates(): void {
    this.ratesSubscription = this.ratesService.getData().subscribe((rates: Rate[]) => {
      this.rates = [
        { cc: 'UAH', rate: 1 },
        ...rates,
      ];
    });
  }

  ngOnDestroy(): void {
    this.ratesSubscription.unsubscribe();
  }
}
