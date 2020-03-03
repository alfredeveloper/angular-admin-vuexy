import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getCompanies(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/companies`);

  }

  getCompany(id): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/companies/${id}`);

  }

  saveCompany(data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/api/companies/`, data);

  }

  updateCompany(id, data): Observable<any> {

    return this.http.put<any>(`${environment.apiUrl}/api/companies/${id}`, data);

  }

  deleteCompany(id): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/api/companies/${id}`);

  }

}
