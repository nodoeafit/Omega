import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Course } from '../../../services/admin-course-services/course-service/admin.course.services';
import { Router, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../admin-search-bar/search-bar.component';
import { SearchService } from '../../../services/admin-course-services/search-service/search.service';
import { AdminCourseListComponent } from "../admin-course-list/admin-course-list.component";
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs'; // Maneja los datos reactivos del servicio

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,  
  imports: [CommonModule, RouterModule, SearchBarComponent, AdminCourseListComponent, MatDialogModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  private router: Router;
  private dialog: MatDialog;
  private searchService: SearchService;

  filteredCourses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  isGridView = false;
  selectedCourseId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    searchService: SearchService,
    router: Router,
    dialog: MatDialog
  ) {
    this.searchService = searchService;
    this.router = router;
    this.dialog = dialog;
    this.filteredCourses$ = this.searchService.filteredCourses$;
    this.loading$ = this.searchService.loading$;
  }

  search(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchService.setSearchTerm(term); 
  }

  navigateTo(path: string, id?: number) {
    this.router.navigate([path, id].filter(Boolean));
  }

  deleteCourse(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '800px',
      data: { itemName: `Curso ID: ${id}`, itemType: 'curso' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchService.deleteCourse(id);
        this.errorMessage = null; // Limpiar mensajes de error previos
      }
    });
  }
  
  toggleView() {
    this.isGridView = !this.isGridView;
  }

  toggleCourseDetails(courseId: number) {
    this.selectedCourseId = this.selectedCourseId === courseId ? null : courseId;
  }

  createNewCourse() {
    this.router.navigate(['admin-dashboard/courses/new']);
  }

  editCourseView(id: number) {
    this.router.navigate(['admin-dashboard/courses/edit-view', id]);
  }

  editCourseContent(id: number) {
    this.router.navigate(['admin-dashboard/courses/edit-content', id]);
  }

  // Método para manejar errores
  handleError(error: any) {
    console.error('Error in admin dashboard:', error);
    this.errorMessage = 'Error al cargar los cursos. Por favor, inténtalo de nuevo.';
  }

  // Método para limpiar errores
  clearError() {
    this.errorMessage = null;
  }

  // Método para recargar datos
  refreshData() {
    this.clearError();
    // El servicio se encargará de recargar los datos
  }
}