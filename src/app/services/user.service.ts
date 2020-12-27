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

  newCustomer(newUser: User): Observable<User> {
    return this.httpClient.post<User>(API_URL + 'user/customer/add', newUser, HTTP_OPTIONS);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + 'user/all', HTTP_OPTIONS);
  }

  getAllCustomers(): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + 'user/customers', HTTP_OPTIONS);
  }

  getUserByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<User>(API_URL + 'user/connected', {params});
  }
}
