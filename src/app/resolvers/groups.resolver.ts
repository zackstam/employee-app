import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupsService } from '../services/group.service';

@Injectable()
export class GroupResolver implements Resolve<any> {

  constructor(
    private groupService: GroupsService
  ) { }
  resolve(): Observable<any>|Promise<any>|any {
    return this.groupService.all();
  }
}
