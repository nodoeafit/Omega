import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../services/admin-course-services/course-service/admin.course.services';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-course-form',
  templateUrl: './admin-course-form.component.html',
  styleUrls: ['./admin-course-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
}) 
export class AdminCourseFormComponent implements OnInit {
  @Output() courseUpdated = new EventEmitter<void>();
  courseForm!: FormGroup;
  isEditMode = false;
  courseId: number | null = null;
  showConfirmation = false;
  confirmationMessage = '';

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initializeForm();
  
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.courseId = +id;
            return this.courseService.getCourseById(this.courseId);
          }
          return of(null);
        })
      )
      .subscribe(course => {
        if (course) {
          const formattedCourse = {
            ...course,
            certification: course.certification === 'Certificación virtual' ? true : false
          };
          this.courseForm.patchValue(formattedCourse);
        }
      });
  }
  
  

  private initializeForm() {
    this.courseForm = this.fb.group({
      id: [0],
      title: ['', Validators.required], 
      modality: ['Presencial', Validators.required],
      certification: ['No certificable', Validators.required], 
      duration: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]
    });
  }
  

  saveCourse() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
  
      formData.certification = formData.certification === 'Certificación virtual' 
        ? 'Certificación virtual' 
        : 'No certificable';
  
      console.log('Valor guardado de certification:', formData.certification); 
  
      const courseOperation = this.isEditMode
      ? this.courseService.updateCourse(formData)
      : this.courseService.addCourse({ ...formData, id: Date.now() });

    courseOperation.subscribe({
      next: () => {
        const dialogRef = this.dialog.open(ConfirmationComponent, {
          width: '400px',
          data: { message: this.isEditMode ? 'Curso actualizado correctamente' : 'Curso creado correctamente' }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.courseUpdated.emit();
          this.router.navigate(['/admin-dashboard']);
        });
      },
      error: (err: any) => console.error(`Error al ${this.isEditMode ? 'actualizar' : 'agregar'} el curso:`, err)
    });
  }
}
  
  
  
  

  showModal(message: string) {
    this.confirmationMessage = message;
    this.showConfirmation = true;

    setTimeout(() => {
      this.closeModal();
    }, 2000);
  }

  closeModal() {
    this.showConfirmation = false;
    this.router.navigate(['admin-dashboard/courses']);
  }

  cancel() {
    this.router.navigate(['admin-dashboard/courses']);
  }
  
}