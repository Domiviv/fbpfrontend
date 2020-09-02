import { Injectable } from '@angular/core';
import { Item } from '../models/Item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) {
  }

  getAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${API_URL}item/all`);
  }

  getItemById(id: number): Observable<Item>{
    return this.httpClient.get<Item>(`${API_URL}item/${id}`);
  }
}
