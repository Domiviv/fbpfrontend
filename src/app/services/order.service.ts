import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL, HTTP_OPTIONS} from '../app.constants';
import {Order} from '../models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${API_URL}order/all`);
  }

  cancelOrder(id: number): boolean {
    this.httpClient.put(API_URL + 'order/cancel/' + id, HTTP_OPTIONS).subscribe();
    return true;
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
