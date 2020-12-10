import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL, HTTP_OPTIONS} from '../app.constants';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  newCustomer(newUser: User): Observable<User> {
    return this.httpClient.post<User>(API_URL + 'user/customer/add', newUser, HTTP_OPTIONS);
  }
}
