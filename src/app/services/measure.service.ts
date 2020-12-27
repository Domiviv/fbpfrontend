import {Injectable} from '@angular/core';
import {Measure} from '../models/Measure.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {


  constructor(private httpClient: HttpClient) {
  }

  getAllMeasures(): Observable<Measure[]> {
    return this.httpClient.get<Measure[]>(`${API_URL}measure/all`);
  }

  getMeasureById(id: number): Observable<Measure> {
    return this.httpClient.get<Measure>(`${API_URL}measure/${id}`);
  }
}
