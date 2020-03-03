import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getSuppliers(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/suppliers`);

  }

  getSupplier(id): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/suppliers/${id}`);

  }

  saveSupplier(data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/api/suppliers`, data);

  }

  updateSupplier(id, data): Observable<any> {

    return this.http.put<any>(`${environment.apiUrl}/api/suppliers/${id}`, data);

  }

  deleteSupplier(id): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/api/suppliers/${id}`);

  }
}
