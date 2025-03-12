import { Component } from '@angular/core';
import { AdminGroupServiceService } from '../services/admin-group-services/admin-group-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-group-component',
  imports: [CommonModule],
  templateUrl: './admin-group-component.component.html',
  styleUrl: './admin-group-component.component.scss'
})
export class AdminGroupComponentComponent {
  groups: any[] = [];

  constructor(private groupService: AdminGroupServiceService) {}

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
    });
  }

  deleteGroup(id: number): void {
    this.groupService.deleteGroup(id);
  }
  getdetails(id: number): void {
    this.groupService.getGroupById(id);
  }
}
