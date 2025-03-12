import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminGroupServiceService } from '../../services/admin-group-services/admin-group-service.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; //


@Component({
  selector: 'app-group-details',
  imports: [CommonModule],
  templateUrl: './group-details.component.html'
})
export class GroupDetailsComponent implements OnInit {
  groupId!: number;
  group: any;

  constructor(
    private route: ActivatedRoute,
    private groupService: AdminGroupServiceService,
    private location : Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      this.groupService.getGroupById(this.groupId).subscribe(data => {
        this.group = data;
      });
    });
  }

  goBack(): void {
    this.location.back(); 
  }
}
