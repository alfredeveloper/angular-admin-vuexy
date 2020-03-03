import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('token')
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
