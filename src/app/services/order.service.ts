import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL, HTTP_OPTIONS} from '../app.constants';
import {Order} from '../models/Order.model';
import {User} from '../models/User.model';
import {Item} from '../models/Item.model';
import {Stock} from '../models/Stock.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${API_URL}order/all`);
  }

  getOrdersByUserEmail(email: string): Observable<Order[]> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<Order[]>(API_URL + 'order/user', {params});
  }

  cancelOrder(id: number): boolean {
    this.httpClient.put(API_URL + 'order/cancel/' + id, HTTP_OPTIONS).subscribe();
    return true;
  }

  addOrder(idUser: number, stocks: Stock[]): void {
    console.log(stocks);
    this.httpClient.post<boolean>(API_URL + 'order/add?idUser=' + idUser, stocks, HTTP_OPTIONS).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  // getItemById(id: number): Observable<Item>{
  //   return this.httpClient.get<Item>(`${API_URL}item/${id}`);
  // }
  //
  // newItem(newItem: Item): Observable<Item> {
  //   return this.httpClient.post<Item>(API_URL + 'item/add', newItem, HTTP_OPTIONS);
  // }
  //
  // updateItem(newItem: Item): Observable<Item> {
  //   console.log(newItem.idItem);
  //   return this.httpClient.put<Item>(API_URL + 'item/update/' + newItem.idItem , newItem, HTTP_OPTIONS);
  // }
  //
  // newItemContains(newItemContains: ItemContains): Observable<ItemContains> {
  //   return this.httpClient.post<ItemContains>(API_URL + 'item-contains', newItemContains, HTTP_OPTIONS);
  // }
  //

}
