import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4MzIwNTcxNywiZXhwIjoxNTgzMjA5MzE3LCJuYmYiOjE1ODMyMDU3MTcsImp0aSI6IlBrdHJhWG56b3R0Zk54clAiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.QrgA_mUrhuwOUKSLANQuZOgqfq_0GGZ6yg9w1KPSosc`
  })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http: HttpClient,
  ) { }

  savePurchase(data): Observable<any> {

    console.log('httpOntions',`Bearer ${localStorage.getItem('token').toString()}`)
    return this.http.post<any>(`${environment.apiUrl}/api/purchases/`, data, httpOptions);

  }

}
