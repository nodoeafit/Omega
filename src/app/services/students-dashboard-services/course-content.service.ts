import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseContent } from '../../interfaces/resources_IA_para_todos.interface';

@Injectable({ providedIn: 'root' })
export class CourseContentService {
  private dataUrl: string = 'assets/resources_IA_para_todos.json';

  constructor(private http: HttpClient) {}

  getCourseContent(): Observable<CourseContent> {
    return this.http.get<CourseContent>(this.dataUrl);
  }
}
