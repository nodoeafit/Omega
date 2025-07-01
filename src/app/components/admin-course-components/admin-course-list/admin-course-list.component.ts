import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course, CourseService } from '../../../services/admin-course-services/course-service/admin.course.services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AdminCourseListComponent {
  @Input() filteredCourses: Course[] = [];
  @Output() courseDeleted = new EventEmitter<number>();
  selectedCourse: Course | null = null;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private dialog: MatDialog
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
    if (!id) {
      console.error('ID del curso no válido');
      return;
    }

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { 
        itemName: this.selectedCourse?.title || 'este curso',
        itemType: 'curso'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.deleteCourse(id).subscribe({
          next: () => {
            console.log(`Curso con ID ${id} eliminado exitosamente.`);
            // Emitir evento para actualizar la lista en el componente padre
            this.courseDeleted.emit(id);
            // Limpiar selección si el curso eliminado era el seleccionado
            if (this.selectedCourse?.id === id) {
              this.selectedCourse = null;
            }
          },
          error: (error) => {
            console.error('Error al eliminar el curso:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
          }
        });
      }
    });
  }
  showDetails(course: Course) {
    this.selectedCourse = course;
  }

}
