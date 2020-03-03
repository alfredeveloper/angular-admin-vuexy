import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getKardex(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/kardex?inventory_id=${localStorage.getItem('inventoryId')}`);

  }

  saveKardex(data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/api/transfers`, data);

  }

}
