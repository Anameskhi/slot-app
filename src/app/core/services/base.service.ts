import { environment } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  apiUrl = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }

  post<T>(url: string, body: any ): Observable<T>{
    return this.http.post<T>(this.apiUrl + url, body)
  }
  get<T>(url: string): Observable<T>{
    return this.http.get<T>(this.apiUrl + url)
  }

  delete<T>(url: string): Observable<T>{
    return this.http.delete<T>(this.apiUrl + url)
  }

}