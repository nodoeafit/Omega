import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Course, Unit } from '../../../models/admin-course-models/course-editor-model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { editableCourse } from '../course-service/admin.course.services';

@Injectable({
  providedIn: 'root'
})
export class CourseEditorService {
  editingUnitIndex: number | null = null;  
  private courseSubject = new BehaviorSubject<Course>({ course: '', content: [] });
  private undoStack: Course[] = []; 

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {}

 
  getCourse(): Observable<Course> {
    return this.courseSubject.asObservable();
  }
  


 addUnit(newUnit: Unit): void {
  this.saveStateForUndo(); 

  const currentCourse = this.courseSubject.value;
  if (!currentCourse) return;

  const updatedContent = [...currentCourse.content, newUnit];

  updatedContent.forEach((unit, index) => unit.unidad = index + 1);

  this.courseSubject.next({ ...currentCourse, content: updatedContent });
}


moveUnit(previousIndex: number, currentIndex: number) {
  const currentCourse = this.courseSubject.value;
  if (!currentCourse || previousIndex < 0 || currentIndex < 0 || previousIndex >= currentCourse.content.length || currentIndex >= currentCourse.content.length) {
    return;
  }

  const updatedContent = [...currentCourse.content];
  const movedUnit = updatedContent.splice(previousIndex, 1)[0]; 
  updatedContent.splice(currentIndex, 0, movedUnit); 

  this.courseSubject.next({ ...currentCourse, content: updatedContent });
  this.saveCourseToLocal(); 
}


removeUnit(unitIndex: number) {
  const currentCourse = this.courseSubject.value;
  if (!currentCourse || unitIndex < 0 || unitIndex >= currentCourse.content.length) return;

  const updatedContent = [...currentCourse.content];
  updatedContent.splice(unitIndex, 1);

  this.courseSubject.next({ ...currentCourse, content: updatedContent });

  this.saveCourseToLocal();
}


addResource(unitIndex: number, resourceName: string, link: string, embed: string) {
  
  const currentCourse = this.courseSubject.value;

  const updatedContent = [...currentCourse.content];
  updatedContent[unitIndex].contenido.push({ ResourceName: resourceName, Link: link, Embed: embed });

  this.courseSubject.next({ ...currentCourse, content: updatedContent });
}



  removeResource(unitIndex: number, resourceIndex: number) {
    const currentCourse = this.courseSubject.value;
    if (!currentCourse || !currentCourse.content[unitIndex]) return;

    this.saveStateForUndo(); 

    const updatedContent = [...currentCourse.content];
    updatedContent[unitIndex].contenido = updatedContent[unitIndex].contenido.filter((_, i) => i !== resourceIndex);

    this.courseSubject.next({ ...currentCourse, content: updatedContent });

    this.saveCourseToLocal(); 
}



  saveCourseToLocal(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentCourse = this.courseSubject.value;
      if (currentCourse.course) {
        localStorage.setItem(`editableCourse_${currentCourse.course}`, JSON.stringify(currentCourse));
        console.log(` Curso "${currentCourse.course}" guardado en LocalStorage`);
      }
    }
  }


  loadCourseFromLocal(courseId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCourse = localStorage.getItem(`editableCourse_${courseId}`);
      if (storedCourse) {
        const course = JSON.parse(storedCourse);
        this.courseSubject.next(course);
        console.log(` Curso "${courseId}" cargado desde LocalStorage`);
      } else {
        console.log(` No hay datos guardados para "${courseId}", cargando desde JSON.`);
        this.loadEditableCourse(courseId);
      }
    }
  }

   loadEditableCourse(title: string): void {
    this.http.get<editableCourse>('assets/resources_IA_para_todos.json').subscribe({
      next: (editableData) => {
        console.log(" JSON cargado:", editableData);
  
        if (!editableData || editableData.course !== title) {
          console.warn(` No se encontró información para el curso "${title}", creando curso vacío.`);
          this.courseSubject.next({ course: title, content: [] });
        } else {
          this.courseSubject.next(editableData);
        }
  
        console.log(" Estado final de courseSubject:", this.courseSubject.value);
      },
      error: (err) => {
        console.error(" Error al cargar el JSON:", err);
      }
    });
  }

  saveStateForUndo(): void {
    if (this.courseSubject.value) {
      this.undoStack.push(JSON.parse(JSON.stringify(this.courseSubject.value))); // Clon profundo
      console.log(" Estado guardado en undoStack", this.undoStack);
    }
  }
  
  undoLastChange(): void {
    if (this.undoStack.length === 0) {
      console.warn("No hay cambios para deshacer.");
      return;
    }
  
    const previousState = this.undoStack.pop();
    if (previousState) {
      this.courseSubject.next(previousState);
      console.log(" Deshacer: Estado restaurado", previousState);
    }
  }
  
  hasUndo(): boolean {
    return this.undoStack.length > 0;
  }

   updateCourse(updatedCourse: Course) {
    this.courseSubject.next({ ...updatedCourse }); 
    this.saveCourseToLocal(); 
  }
  

}