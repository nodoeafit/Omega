import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { CourseService } from '../course-service/admin.course.services';
import { Course } from '../course-service/admin.course.services';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>('');
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  filteredCourses$: Observable<Course[]>;
  loading$ = this.loadingSubject.asObservable();

  constructor(private courseService: CourseService) {
    // Usar búsqueda en el backend cuando hay término de búsqueda
    this.filteredCourses$ = this.searchTerm.pipe(
      switchMap(term => {
        if (term.trim() === '') {
          // Si no hay término de búsqueda, mostrar todos los cursos
          return this.courseService.getCourses();
        } else {
          // Si hay término de búsqueda, usar la API de búsqueda
          this.loadingSubject.next(true);
          return this.courseService.searchCoursesByTitle(term).pipe(
            map(courses => {
              this.loadingSubject.next(false);
              return courses;
            })
          );
        }
      })
    );
  }

  setSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  // Eliminar curso usando el servicio actualizado
  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        console.log(`Course ${id} deleted successfully`);
      },
      error: (error) => {
        console.error('Error deleting course:', error);
      }
    });
  }

  // Obtener el término de búsqueda actual
  getCurrentSearchTerm(): string {
    return this.searchTerm.getValue();
  }

  // Limpiar búsqueda
  clearSearch() {
    this.searchTerm.next('');
  }
}
