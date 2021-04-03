import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private employeesUrl = 'api/employees';  // URL to web api
  constructor(private http: HttpClient) { }


  getHeroes(): Observable<any[]> {
    return this.http.get<any[]>(this.employeesUrl)
  }

  addHeroes(hero: any): Observable<any> {
    return this.http.post<any[]>(this.employeesUrl, hero)
  }

  errorHandler(response: any): Observable<any> {
    return throwError(response.error.message || 'Server Error');
  }
}
