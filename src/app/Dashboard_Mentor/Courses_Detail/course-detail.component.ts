import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CourseDetailService } from '../../services/course_detail.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {

  NombreCurso: any;
  Completado: any;
  Estudiante: any;
  modalOpen: boolean = false;
  ModalOpenNotas: boolean = false;
  selectedStudent: any = null;


  constructor(
    private route: ActivatedRoute,
    private courseDetailService: CourseDetailService
  ) { }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        const mentorId = Number(params['mentorId']);
        const courseId = Number(params['id']);

        if (!isNaN(mentorId) && !isNaN(courseId)) {
          this.courseDetailService.obtenerDetallesCurso(mentorId, courseId).subscribe({
            next: data => {
              this.NombreCurso = data.curso.nombre;
              this.Completado = data.curso.completado
              this.Estudiante = data.curso.estudiantes;
            },
            error: error => {
              console.error("Error al obtener los detalles del curso:", error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al obtener los parámetros de la ruta:', error);
      }
    });
  }

  calcularNotaFinal(estudiante: any): number {
    const notas = estudiante.notas;
    if (!notas || notas.length === 0) return 0;

    let total = 0;
    let totalPorcentaje = 0;

    notas.forEach((nota: any) => {
      total += nota.calificacion * (nota.porcentaje / 100);
      totalPorcentaje += nota.porcentaje;
    });

    return totalPorcentaje > 0 ? total : 0;
  }

  toggleNotas(estudiante: any) {
    estudiante.verNotas = !estudiante.verNotas;
  }

  openEditModal(estudiante: any) {
    this.selectedStudent = JSON.parse(JSON.stringify(estudiante));
    this.modalOpen = true;
  }

  openNotasModal(estudiante: any) {
    this.selectedStudent = JSON.parse(JSON.stringify(estudiante));
    this.ModalOpenNotas = true;
  }

  openModal() {
    this.modalOpen = true;
    this.ModalOpenNotas = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.ModalOpenNotas = false;
    this.selectedStudent = null;
  }

  saveChanges() {
    if (this.selectedStudent) {
      const index = this.Estudiante.findIndex((e: any) => e.id === this.selectedStudent.id);
      if (index !== -1) {
        this.Estudiante[index] = { ...this.selectedStudent };
      }
      this.closeModal();
    }
  }


}
