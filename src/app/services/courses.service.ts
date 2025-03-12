import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private Urlcursos = '/assets/courses.json';

  constructor(private http: HttpClient) {}

  obtenerMentorConCursos(mentorId: number): Observable<any> {
    return this.http.get<any[]>(this.Urlcursos).pipe(
      map((cursos) => this.filtrarCursosPorMentor(cursos, mentorId))
    )
  }

  private filtrarCursosPorMentor(cursos: any[], mentorId: number): any {
    const mentor = cursos.find((mentor) => mentor.id === mentorId);
    if (mentor) {
      return {
        id: mentor.id,
        nombre: mentor.nombre,
        correo: mentor.correo,
        cursos: mentor.cursos
      }
    }
    return null
  }
}
