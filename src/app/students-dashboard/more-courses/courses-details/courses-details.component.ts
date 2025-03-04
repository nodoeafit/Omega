import { SidecontentService } from './../../../services/servicesDesign/sidecontent.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Courses } from '../../../interfaces/students-dashboard-interfaces/more-courses.interface';

@Component({
  selector: 'app-courses-details',
  imports: [CommonModule],
  templateUrl: './courses-details.component.html',
  styleUrl: './courses-details.component.scss',
})
export class CoursesDetailsComponent implements OnInit {
  public moreCourses?: Courses;

  constructor(private sideContentService: SidecontentService) {}

  ngOnInit(): void {
    this.sideContentService.selectedCourse$.subscribe((course) => {
      this.moreCourses = course!;
    });
  }
  // Close details modal
  closeDetails() {
    this.sideContentService.toggleactivateSideContent();
  }
}
