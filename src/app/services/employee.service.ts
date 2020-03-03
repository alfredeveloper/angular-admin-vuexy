import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
  ) { }
  
  saveEmployee(data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/api/employees/`, data);

  }

  getEmployees(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/employees`);

  }

}
