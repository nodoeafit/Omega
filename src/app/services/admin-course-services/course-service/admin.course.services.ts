import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, take, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Course { 
  id?: number;
  title: string;
  imageUrl?: string;
  modality: 'PRESENCIAL' | 'VIRTUAL';
  certification: string;
  duration: string;
  description: string;
  price: number;
}

export interface editableCourse { 
  course: string;
  content: {
    unidad: number;
    contenido: {
      ResourceName: string;
      Link: string;
      Embed: string;
    }[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // Cambiar URLs para usar la API Spring Boot
  private apiBaseUrl = 'http://localhost:8080/api';
  private coursesUrl = `${this.apiBaseUrl}/courses`;
  private courseContentUrl = `${this.apiBaseUrl}/course-content`;
  
  private coursesSubject = new BehaviorSubject<Course[] | null>(null);
  private searchTermSubject = new BehaviorSubject<string>('');
  private loadingSubject = new BehaviorSubject<boolean>(false);

  courses$ = this.coursesSubject.asObservable();
  searchTerm$ = this.searchTermSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCourses();
  }

  // Cargar cursos desde la API
  private loadCourses(): void {
    this.loadingSubject.next(true);
    this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(courses => {
          this.coursesSubject.next(courses);
          this.loadingSubject.next(false);
        }),
        catchError(error => {
          console.error('Error loading courses:', error);
          this.loadingSubject.next(false);
          return of([]);
        })
      )
      .subscribe();
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term.toLowerCase());
  }

  // Obtener todos los cursos desde la API
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl).pipe(
      catchError(error => {
        console.error('Error fetching courses:', error);
        return of([]);
      })
    );
  }

  getCourseNameById(courseId: string): Observable<string | null> {
    return this.getCourses().pipe(
      map(courses => {
        const course = courses.find(c => c.id && c.id.toString() === courseId);
        return course ? course.title : null;
      })
    );
  }

  // Obtener curso por ID desde la API
  getCourseById(id: number): Observable<Course | null> {
    return this.http.get<Course>(`${this.coursesUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching course ${id}:`, error);
        return of(null);
      })
    );
  }

  // Obtener información pública + editable de un curso por su título
  getCourseByTitle(title: string): Observable<{ public: Course | null, editable: editableCourse | null }> {
    return forkJoin({
      public: this.getCourses().pipe(
        map(courses => courses?.find(course => course.title === title) || null)
      ),
      editable: this.http.get<editableCourse>(`${this.courseContentUrl}/name/${encodeURIComponent(title)}`).pipe(
        catchError(error => {
          console.error(`Error fetching course content for ${title}:`, error);
          return of(null);
        })
      )
    });
  }

  // Crear nuevo curso
  addCourse(newCourse: Course): Observable<Course> {
    // Preparar los datos para el backend
    const courseData = {
      ...newCourse,
      price: Number(newCourse.price)
    };
    
    return this.http.post<Course>(this.coursesUrl, courseData).pipe(
      tap(course => {
        // Actualizar la caché local
        const currentCourses = this.coursesSubject.getValue() || [];
        this.coursesSubject.next([...currentCourses, course]);
      }),
      catchError(error => {
        console.error('Error creating course:', error);
        throw error;
      })
    );
  }

  // Actualizar curso existente
  updateCourse(updatedCourse: Course): Observable<Course> {
    if (!updatedCourse.id) {
      throw new Error('Course ID is required for update');
    }
    
    // Preparar los datos para el backend
    const courseData = {
      ...updatedCourse,
      price: Number(updatedCourse.price)
    };
    
    return this.http.put<Course>(`${this.coursesUrl}/${updatedCourse.id}`, courseData).pipe(
      tap(course => {
        // Actualizar la caché local
        const currentCourses = this.coursesSubject.getValue() || [];
        const updatedCourses = currentCourses.map(c => 
          c.id && c.id === course.id ? course : c
        );
        this.coursesSubject.next(updatedCourses);
      }),
      catchError(error => {
        console.error('Error updating course:', error);
        throw error;
      })
    );
  }

  // Eliminar curso
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.coursesUrl}/${id}`).pipe(
      tap(() => {
        // Actualizar la caché local
        const currentCourses = this.coursesSubject.getValue() || [];
        const updatedCourses = currentCourses.filter(course => course.id !== id);
        this.coursesSubject.next(updatedCourses);
      }),
      catchError(error => {
        console.error('Error deleting course:', error);
        throw error;
      })
    );
  }

  // Buscar cursos por título
  searchCoursesByTitle(title: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.coursesUrl}/search?title=${encodeURIComponent(title)}`).pipe(
      catchError(error => {
        console.error('Error searching courses:', error);
        return of([]);
      })
    );
  }

  // Obtener cursos por modalidad
  getCoursesByModality(modality: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.coursesUrl}/modality/${modality}`).pipe(
      catchError(error => {
        console.error('Error fetching courses by modality:', error);
        return of([]);
      })
    );
  }

  // Obtener cursos por rango de precio
  getCoursesByPriceRange(minPrice: number, maxPrice: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.coursesUrl}/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`).pipe(
      catchError(error => {
        console.error('Error fetching courses by price range:', error);
        return of([]);
      })
    );
  }

  // Recargar cursos desde la API
  refreshCourses(): void {
    this.loadCourses();
  }
}
