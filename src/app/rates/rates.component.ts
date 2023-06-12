import { Component, Input, OnInit } from '@angular/core';
import { Rate } from '../interfaces/rate.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.sass']
})
export class RatesComponent implements OnInit {
  @Input() rates: Rate[];

  form: FormGroup = this.fb.group({
    firstCurrency: ['EUR', Validators.required],
    firstSum: ['1.00000', Validators.required],
    secondCurrency: ['UAH', Validators.required],
    secondSum: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.count();
  }

  get firstCurrency(): string {
    return this.form.get('firstCurrency')?.value;
  }

  get firstSum(): number {
    return +this.form.get('firstSum')?.value;
  }

  get secondCurrency(): string {
    return this.form.get('firstCurrency')?.value;
  }

  get secondSum(): number {
    return +this.form.get('secondSum')?.value;
  }

  count(firstChanged: boolean = true): void {
    const firstCurrency = this.form.get('firstCurrency')?.value;
    const secondCurrency = this.form.get('secondCurrency')?.value;
    if (firstCurrency && secondCurrency) {
      const firstRate = this.rates.find((rate) => rate.cc === firstCurrency);
      const secondRate = this.rates.find((rate) => rate.cc === secondCurrency);
      if (firstRate && secondRate) {
        if (firstChanged) {
          const secondSum = (+firstRate.rate * +this.form.get('firstSum')?.value / secondRate.rate).toFixed(5);
          this.form.get('secondSum')?.setValue(secondSum);
        } else {
          const firstSum = ((+this.secondSum * secondRate.rate) / +firstRate.rate).toFixed(5);
          this.form.get('firstSum')?.setValue(firstSum);
        }
      }
    }
  }
}

