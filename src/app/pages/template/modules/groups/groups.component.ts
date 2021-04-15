import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GroupsService } from '../../../../services/group.service';
import { MatDialog } from '@angular/material/dialog';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { Group } from '../../../../interfaces/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'action'];
  dataSource: Group[] = [];

  constructor(private groupService: GroupsService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getGroup();
  }

  getGroup() {
    this.groupService.all().subscribe((data: Group[]) => (this.dataSource = data));
  }

  edit(group: any) {
    const dialogRef = this.dialog.open(EditGroupComponent, {
      width: '250px',
      data: group,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getGroup();
      }
    });
  }

  delete(group: any) {
    this.groupService.delete(group.id).subscribe(() => this.getGroup());
  }
}
