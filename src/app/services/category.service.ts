import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getCategories(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/categories`);

  }

  getCategory(id): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/categories/${id}`);

  }

  saveCategory(data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/api/categories/`, data);

  }

  updateCategory(id, data): Observable<any> {

    return this.http.put<any>(`${environment.apiUrl}/api/categories/${id}`, data);

  }

  deleteCategory(id): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/api/categories/${id}`);

  }
}
