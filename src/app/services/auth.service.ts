import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../interfaces/employee';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = 'api/users'; // URL to web api

  constructor(private http: HttpClient) {}

  login(login: any): Observable<any> {
    const params = new HttpParams().set('username', login.username).set('password', login.password);

    return this.http
      .get<any[]>(this.usersUrl, { params })

      .pipe(
        tap((data) => {
          localStorage.setItem('user', JSON.stringify(data))
        })

      )
  }
}
