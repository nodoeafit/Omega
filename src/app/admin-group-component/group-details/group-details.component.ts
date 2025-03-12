import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-details',
  imports: [CommonModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export class GroupDetailsComponent implements OnInit {

  groupId!: number;
  group: any; // Replace with proper typing if needed

  groups = [ /* Your groups JSON data here */ ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      this.group = this.groups.find(g => g.id === this.groupId);
    });
  }
}
