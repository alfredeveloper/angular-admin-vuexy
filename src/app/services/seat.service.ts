import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getSeats(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/sedes`);

  }

  getSeatsByCompany(id): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/sedes?company_id=${id}`);

  }

  getSeat(id): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/sedes/${id}`);

  }

  saveSeat(data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/api/sedes/`, data);

  }

  updateSeat(id, data): Observable<any> {

    return this.http.put<any>(`${environment.apiUrl}/api/sedes/${id}`, data);

  }

  deleteSeat(id): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/api/sedes/${id}`);

  }
}
