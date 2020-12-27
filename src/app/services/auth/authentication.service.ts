import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL, HTTP_OPTIONS} from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.httpClient.post<any>(API_URL + 'authenticate', {
      username: credentials.value.email,
      password: credentials.value.pwd
    }, HTTP_OPTIONS);

  }

  register(user): Observable<any> {
    return this.httpClient.post<any>(API_URL + 'register', {
      email: user.email,
      pwd: user.pwd,
      lastName: user.lastName,
      firstName: user.firstName,
      address: user.address,
      address2: user.address2
    }, HTTP_OPTIONS);
  }
}
