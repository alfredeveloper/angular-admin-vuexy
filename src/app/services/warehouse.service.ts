import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(
    private http: HttpClient,
  ) { }

  getWarehouses(): Observable<any> {
    
    return this.http.get<any>(`${environment.apiUrl}/api/inventories?company_id=${localStorage.getItem('company_login')}`);

  }

  getWarehousesSubsidiary() : Observable<any> {
    
    return this.http.get<any>(`${environment.apiUrl}/api/inventories?company_id=${localStorage.getItem('company_login')}&office_id=${localStorage.getItem('office_login')}`);

  }

}
