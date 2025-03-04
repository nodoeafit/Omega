import { Component } from '@angular/core';
import { CourseEditorService } from '../../../services/admin-course-services/course-editor-service/course-editor.service';
import { Course, Module, Topic, Subtopic } from '../../../models/admin-course-models/course-editor-model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop'
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-editor',
  imports: [CommonModule, CdkDropList, FormsModule],
  templateUrl: './course-editor.component.html',
  styleUrl: './course-editor.component.scss'
})
export class CourseEditorComponent {
  courses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseEditorService) {
    this.courses = this.courseService.getCourses();

  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
  }

  addModule() {
    if (this.selectedCourse) {
      this.courseService.addModule(this.selectedCourse.id, "Nuevo Módulo");
    }
  }
  drop (event: CdkDragDrop<Module[]>) {
    if (this.selectedCourse) {
      moveItemInArray(this.selectedCourse.modules, event.previousIndex, event.currentIndex);
      this.courseService.saveCourses();
    }
  }
  editModule(module: Module) {
    module.isEditing = true;
  }

  saveModule(module: Module) {
    module.isEditing = false;
    this.courseService.saveCourses();
  }

  deleteModule(module: Module) {
    if (this.selectedCourse) {
      this.selectedCourse.modules = this.selectedCourse.modules.filter(m => m.id !== module.id);
      this.courseService.saveCourses();
    }
  }
}
