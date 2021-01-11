import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL, HTTP_OPTIONS} from '../app.constants';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  // Inscription
  addCustomer(newUser: User): Observable<boolean> {
    return this.httpClient.post<boolean>(API_URL + 'user/customer/add', newUser, HTTP_OPTIONS);
  }

  // Récupère la liste des utilisateurs
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + 'user/all', HTTP_OPTIONS);
  }

  // Récupère la liste des clients
  getAllCustomers(): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + 'user/customers', HTTP_OPTIONS);
  }

  // Récuprère l'utilisateur sur base d'un e-mail
  getUserByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<User>(API_URL + 'user/connected', {params});
  }
}
