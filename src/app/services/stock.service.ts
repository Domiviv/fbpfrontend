import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL} from '../app.constants';
import {Stock} from '../models/Stock.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) {
  }

  getStockItemByItemId(idItem: number): Observable<Stock> {
    return this.httpClient.get<Stock>(API_URL + 'stock/item/' + idItem);
  }
}
