import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Courses } from '../../interfaces/students-dashboard-interfaces/more-courses.interface';

@Injectable({
  providedIn: 'root',
})
export class SidecontentService {
  constructor() {}

  private activateSideContentSubject = new BehaviorSubject<boolean>(false);
  activateSideContent = this.activateSideContentSubject.asObservable();

  private selectedCourseSubject = new BehaviorSubject<Courses | null>(null);
  selectedCourse$ = this.selectedCourseSubject.asObservable();

  toggleactivateSideContent() {
    this.activateSideContentSubject.next(
      !this.activateSideContentSubject.value
    );
  }

  setSelectedCourse(course: Courses) {
    this.selectedCourseSubject.next(course);
  }
}
