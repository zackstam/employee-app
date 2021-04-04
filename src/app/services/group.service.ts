import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Group } from '../interfaces/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private groupUrl = 'api/groups/';  // URL to web api

  constructor(private http: HttpClient) { }

  all(): Observable<any[]> {
    return this.http.get<Observable<any>[]>(this.groupUrl)
  }

  add(group: Group): Observable<any> {
    return this.http.post<Group>(this.groupUrl, group)
  }

  update(group: Group): Observable<any> {
    return this.http.post<Group>(this.groupUrl, group)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any[]>(this.groupUrl + id)
  }
}
