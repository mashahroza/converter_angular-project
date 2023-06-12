import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Rate } from './interfaces/rate.interface';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  constructor(private http: HttpClient) {}
      
  getData(): Observable<Rate[]> {
      return this.http.get<Rate[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  }
}
