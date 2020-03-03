import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubsidiaryService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getSubsidiaries(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/offices`);

  }

  getSubsidiariesBySede(id): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/offices?sede_id=${id}`);

  }

  getSubsidiary(id): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/offices/${id}`);

  }

  saveSubsidiary(data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/api/offices/`, data);

  }

  updateSubsidiary(id, data): Observable<any> {

    return this.http.put<any>(`${environment.apiUrl}/api/offices/${id}`, data);

  }

  deleteSubsidiary(id): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/api/offices/${id}`);

  }

  selectSubsidiary(id, data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/api/set-company-login/${id}`, data);

  }
}
