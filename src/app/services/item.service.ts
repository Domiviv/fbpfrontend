import {Injectable} from '@angular/core';
import {Item} from '../models/Item.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL, HTTP_OPTIONS} from '../app.constants';
import {ItemContains} from '../models/ItemContains.model';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) {
  }

  getAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${API_URL}item/all`);
  }

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>(`${API_URL}item/${id}`);
  }

  addItem(newItem: Item): Observable<Item> {
    return this.httpClient.post<Item>(API_URL + 'item/add', newItem, HTTP_OPTIONS);
  }

  updateItemById(newItem: Item): Observable<Item> {
    return this.httpClient.put<Item>(API_URL + 'item/update/' + newItem.idItem, newItem, HTTP_OPTIONS);
  }

  newItemContains(newItemContains: ItemContains): Observable<ItemContains> {
    return this.httpClient.post<ItemContains>(API_URL + 'item-contains', newItemContains, HTTP_OPTIONS);
  }

  deleteById(id: number): boolean {
    this.httpClient.delete(API_URL + 'item-contains/delete/' + id, HTTP_OPTIONS).subscribe();
    this.httpClient.delete(API_URL + 'item/delete/' + id, HTTP_OPTIONS).subscribe();
    return true;
  }

}
