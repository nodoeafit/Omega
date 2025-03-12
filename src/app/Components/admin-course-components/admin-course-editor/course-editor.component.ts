import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseEditorService } from '../../../services/admin-course-services/course-editor-service/course-editor.service';
import { Course, Unit, Resource } from '../../../models/admin-course-models/course-editor-model';
import { DragDropModule ,CdkDragDrop, moveItemInArray, CdkDropList } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditResourceDialogComponent } from '../modals/edit-resource-dialog/edit-resource-dialog.component';
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';
import { Subscription } from 'rxjs';
import { CourseService } from '../../../services/admin-course-services/course-service/admin.course.services';
import { ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-editor',
  standalone: true,
  imports: [
    CdkDropList,
    CommonModule,
    DragDropModule
  ],
  templateUrl: './course-editor.component.html',
  styleUrl: './course-editor.component.scss'
})
export class CourseEditorComponent implements OnInit {
  @ViewChild('unitsContainer', { static: false }) unitsContainer!: CdkDropList;
  @ViewChildren('unitElement') unitElements!: QueryList<ElementRef>;
  @ViewChildren('resourceElement') resourceElements!: QueryList<ElementRef>;


  course: Course | null = null;
  expandedUnits = new Set<number>(); 
  openMenuIndex: number | null = null;
  highlightedUnitIndex: number | null = null;
  deleteContainerData: Unit[] = []; 


  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public courseEditorService: CourseEditorService,
    private dialog: MatDialog,
    private renderer: Renderer2, 
    private router: Router
  ) {}


 ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      if (courseId) {
        this.courseService.getCourseNameById(courseId).subscribe(courseName => {
          if (courseName) {
            this.courseEditorService.loadCourseFromLocal(courseName);
          } else {
            console.warn(` No se encontró un curso con ID ${courseId}`);
          }
        });
      }
    });

    this.courseEditorService.getCourse().subscribe(course => {
      this.course = course ? { ...course, content: [...(course.content || [])] } : null;
    });
  }

  undoLastChange() {
    this.courseEditorService.undoLastChange();
  }

  toggleUnit(index: number) {
    if (this.expandedUnits.has(index)) {
      this.expandedUnits.delete(index);
    } else {
      this.expandedUnits.clear(); 
      this.expandedUnits.add(index); 
    }
  }

   toggleMenu(index: number) {
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }


  openEditModal(unit: any, resource?: Resource) {
    const isEditing = !!resource; // 🔹 Verifica si estamos editando
    const newResource = resource ? { ...resource } : { ResourceName: '', Link: '', Embed: '' };

    const previouslyExpandedUnits = new Set(this.expandedUnits);

    const dialogRef = this.dialog.open(EditResourceDialogComponent, {
      width: '80vw',
      maxWidth: '1200px',
      height: '90vh',
      maxHeight: '800px',
      data: { 
        resource: newResource,
        isEditing: isEditing  
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (isEditing && resource) { 
          Object.assign(resource, result);
        } else { 
          unit.contenido.push(result);

          setTimeout(() => {
            this.expandedUnits = previouslyExpandedUnits;
            this.expandedUnits.add(this.course?.content.indexOf(unit) ?? -1);
            this.scrollToResource(this.course?.content.indexOf(unit) ?? -1);
          }, 200);
        }
      }
      this.expandedUnits = previouslyExpandedUnits;
      this.expandedUnits.add(this.course?.content.indexOf(unit) ?? -1);
    });
  }
  
  

  dropResource(event: CdkDragDrop<Resource[]>, unitIndex: number) {
    if (!this.course) return;
    moveItemInArray(this.course.content[unitIndex].contenido, event.previousIndex, event.currentIndex);
    this.courseEditorService.saveCourseToLocal();
  }

  openDeleteDialog(unitIndex: number) {
    const unit = this.course?.content[unitIndex];
    if (!unit) return;
  
    this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { unitName: unit.unidad }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.courseEditorService.removeUnit(unitIndex);
      }
    });
  }

  deleteResource(unit: Unit, resourceIndex: number): void {
    this.courseEditorService.removeResource(
      this.course?.content.indexOf(unit) ?? -1,
      resourceIndex
    );
  }
  

  dropUnit(event: CdkDragDrop<Unit[]>): void {
    if (event.previousIndex === event.currentIndex) return;
    this.courseEditorService.moveUnit(event.previousIndex, event.currentIndex);
  }
  
  deleteUnitOnDrop(event: CdkDragDrop<Unit[]>): void {
    if (!this.course || event.previousIndex < 0 || event.container.id !== 'deleteContainer') return;
  
    const unitToDelete = this.course.content[event.previousIndex];
  
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { itemName: `Unidad: ${unitToDelete.unidad}`, itemType: 'unidad' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {  
        this.courseEditorService.removeUnit(event.previousIndex);
        console.log(" Unidad eliminada permanentemente:", unitToDelete);
      } else {
        console.log(" Eliminación cancelada.");
      }
    });
  }
  

  addUnit(): void {
    if (!this.course) {
      console.warn(" No hay un curso cargado.");
      return;
    }

    const newUnit: Unit = {
      unidad: this.course.content.length + 1,
      contenido: []
    };

    this.courseEditorService.addUnit(newUnit);
    
    setTimeout(() => {
      if (this.course && this.course.content.length > 0) { 
        const lastIndex = this.course.content.length - 1;
        this.expandedUnits.add(lastIndex);
        this.scrollToUnit(lastIndex);
      } else {
        console.warn("No se puede hacer scroll: El curso o su contenido no están definidos.");
      }
    }, 200);
  }

  addResource(unitIndex: number, resourceName: string, link: string, embed: string) {
  
    if (!this.course) {
      console.warn(" No hay curso cargado.");
      return;
    }
  
    const previouslyExpandedUnits = new Set(this.expandedUnits);
    this.courseEditorService.addResource(unitIndex, resourceName, link, embed);
  
    setTimeout(() => {
      this.expandedUnits = previouslyExpandedUnits;
      this.expandedUnits.add(unitIndex);
      this.scrollToResource(unitIndex);
    }, 100);
  }
  
  
  restoreCourseFromJSON() {
    const courseName = this.course?.course || 'IA PARA TODOS'; 
    this.courseEditorService.loadEditableCourse(courseName); 
  }

  confirmRestoreCourse() {
    const confirmed = window.confirm(" ¿Estás seguro de que deseas restaurar el curso a su estado original? Esta acción no se puede deshacer.");
    if (confirmed) {
      this.courseEditorService.loadEditableCourse(this.course?.course ?? 'IA PARA TODOS');
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  private scrollToUnit(index: number) {
    setTimeout(() => {
      const unitElement = this.unitElements.get(index)?.nativeElement;
      if (unitElement) {
        unitElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  }

  private scrollToResource(unitIndex: number) {
    setTimeout(() => {
  
      const unitElement = this.unitElements.get(unitIndex)?.nativeElement;
      const resourceElements = unitElement.querySelectorAll('.draggable-resource');
      const resourceElement = resourceElements[resourceElements.length - 1];
      if (resourceElement) {
        resourceElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        console.warn(" No se pudo encontrar el último recurso en la unidad:", unitIndex);
      }
    }, 300);
  }
  
  saveCourseAndExit() {
    if (!this.course) {
      console.warn(" No hay curso cargado para guardar.");
      return;
    }

    this.courseEditorService.saveCourseToLocal();

    this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: { message: " El curso ha sido guardado correctamente." }
    }).afterClosed().subscribe(() => {
      this.router.navigate(['/admin-dashboard/courses']);
    });
  }
}