import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../services/admin-course-services/course-service/admin.course.services';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchService } from '../../../services/admin-course-services/search-service/search.service';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule],
})
export class AdminCourseListComponent {
  @Input() filteredCourses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private searchService: SearchService
  ) {}

  editCourseView(id: number) {
    console.log(`Editar información del curso con ID: ${id}`);
    this.router.navigate(['admin-dashboard/courses/edit-view', id]);
  }

  editCourseContent(id: number) {
    console.log(`Editar contenido del curso con ID: ${id}`);
    this.router.navigate(['admin-dashboard/courses/edit-content', id]);
  }

  deleteCourse(id: number) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        width: '800px',
        data: { itemName: `Curso ID: ${id}`, itemType: 'curso' }
      });
    
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.searchService.deleteCourse(id); 
        }
      });
    }
    
  showDetails(course: Course) {
    this.selectedCourse = course;
  }

}
