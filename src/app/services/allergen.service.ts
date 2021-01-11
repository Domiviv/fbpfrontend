import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Allergen} from '../models/Allergen.model';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AllergenService {


  constructor(private httpClient: HttpClient) {
  }

  // Récupère la liste des allergènes
  getAllAllergens(): Observable<Allergen[]> {
    return this.httpClient.get<Allergen[]>(`${API_URL}allergen/all`);
  }

  // Récupère un allergène sur base de son id
  getAllergenById(id: number): Observable<Allergen> {
    return this.httpClient.get<Allergen>(`${API_URL}allergen/${id}`);
  }
}
