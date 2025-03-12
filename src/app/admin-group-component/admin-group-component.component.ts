import { Component } from '@angular/core';
import { AdminGroupServiceService } from '../services/admin-group-services/admin-group-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-group-component',
  imports: [CommonModule],
  templateUrl: './admin-group-component.component.html',
  styleUrl: './admin-group-component.component.scss'
})
export class AdminGroupComponentComponent {
  groups: any[] = [];

  constructor(private groupService: AdminGroupServiceService, private router: Router) {}

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
    });
  }

  deleteGroup(id: number): void {
    this.groupService.deleteGroup(id);
  }
  
  getDetails(id: number): void {
    this.router.navigate(['/admin/groups', id]); // Navigate to the details page
  }
}
