import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    usuario: any;
    token: string;

  constructor(
    private http: HttpClient,
  ) { 
    this.cargarStorage()
  }

  estaLogueado() {
    console.log('token', this.token)
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('currentUser') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  login(employee: Employee): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/api/login/`, employee)
    .pipe(map(data => {
      console.log(data);
      if (data && data.token) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('auth', 'true'); // Change for verify token
        localStorage.setItem('map', 'true');
        localStorage.setItem('currentEmployee', JSON.stringify(data.employee))
        return data;
      }
      return data;
    })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('map');
    localStorage.removeItem('auth');
    localStorage.removeItem('currentEmployee');
  }
}
