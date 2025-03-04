import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { MoreCoursesService } from '../../services/students-dashboard-services/more-courses.service';
import { Courses } from '../../interfaces/students-dashboard-interfaces/more-courses.interface';
import { SideMenuComponent } from '../../side-menu/side-menu.component';
import { SidecontentService } from '../../services/servicesDesign/sidecontent.service';
import { CoursesDetailsComponent } from './courses-details/courses-details.component';

@Component({
  selector: 'more-courses',
  imports: [CommonModule, RouterLink],
  templateUrl: './more-courses.component.html',
  styleUrl: './more-courses.component.scss',
})
export class MoreCoursesComponent implements OnInit {
  @ViewChild('contentCards', { static: true })
  contentCards!: ElementRef<HTMLElement>;

  public moreCourses: Courses[] = [];
  activateSideContent: boolean = false;
  courseSelected: Courses | null = null;

  constructor(
    private moreCoursesService: MoreCoursesService,
    private SidecontentService: SidecontentService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.moreCoursesService
      .getMoreCourses()
      .subscribe((data) => (this.moreCourses = data));

    setTimeout(() => {
      const cardCourses =
        this.contentCards.nativeElement.querySelectorAll('.card-courses');
      console.log(cardCourses);

      this.SidecontentService.activateSideContent.subscribe((value) => {
        this.activateSideContent = value;
        if (this.activateSideContent) {
          cardCourses?.forEach((element) => {
            this.renderer.addClass(element, 'openSideContentCourses');
          });
        } else {
          cardCourses?.forEach((element) => {
            this.renderer.removeClass(element, 'openSideContentCourses');
          });
        }
      });
    }, 1000);
  }
  // Show details of the course
  showDetails(course: Courses) {
    this.SidecontentService.setSelectedCourse(course);
    if (!this.activateSideContent) {
      this.SidecontentService.toggleactivateSideContent();
    }
  }
}
