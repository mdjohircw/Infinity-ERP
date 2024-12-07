import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService<T> {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<T[]> {
    return this.http.get<T[]>(apiUrl, { headers: this.headers });
  }

  getById(apiUrl: string, id: number | string): Observable<T> {
    return this.http.get<T>(`${apiUrl}/${id}`, { headers: this.headers });
  }

  create(apiUrl: string, entity: T): Observable<T> {
    return this.http.post<T>(apiUrl, entity, { headers: this.headers });
  }

  update(apiUrl: string, id: number | string, entity: T): Observable<T> {
    return this.http.put<T>(`${apiUrl}/${id}`, entity, { headers: this.headers });
  }

  delete(apiUrl: string, id: number | string): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`, { headers: this.headers });
  }
}
