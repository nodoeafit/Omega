import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseDetailService {
  private Urlcursos = '/assets/courses.json';

  constructor(private http: HttpClient) {}

  obtenerDetallesCurso(mentorId: number, courseId: number): Observable<any> {
    return this.http.get<any[]>(this.Urlcursos).pipe(
      map((cursos) => this.filtrarCursoPorMentorYIdCurso(cursos, mentorId, courseId))
    )
  }

  private filtrarCursoPorMentorYIdCurso(cursos: any[], mentorId: number, courseId: number): any {
    const mentor = cursos.find((curso) => curso.id === mentorId);
    if (mentor) {
      const curso = mentor.cursos.find((curso: any) => curso.id === courseId);
      if (curso) {
        return { 
          curso
        }
      }
    }
    return null
  }
}
