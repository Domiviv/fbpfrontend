import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL} from '../app.constants';
import {SoldItem} from '../models/SoldItem.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SoldItemService {

  constructor(private httpClient: HttpClient) {
  }

  // Récupère la liste des produits vendus
  getAllSoldItems(): Observable<SoldItem[]> {
    return this.httpClient.get<SoldItem[]>(`${API_URL}sold-item/all`);
  }
}
