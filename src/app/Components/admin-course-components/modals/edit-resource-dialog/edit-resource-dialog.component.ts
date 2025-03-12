import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { Resource } from '../../../../models/admin-course-models/course-editor-model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-resource-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, 
    MatDialogModule
  ],
  templateUrl: './edit-resource-dialog.component.html',
  styleUrls: ['./edit-resource-dialog.component.scss']
})
export class EditResourceDialogComponent {
  isDragging = false;
  sanitizedEmbed: SafeHtml = '';
  isEditing: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditResourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: { resource: Resource, isEditing: boolean },
    private sanitizer: DomSanitizer
  ) {
    this.isEditing = data.isEditing; 
    this.updateSanitizedEmbed();
  }


  save() {
    this.dialogRef.close(this.data.resource);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  
    if (event.dataTransfer) {
      if (event.dataTransfer.files.length > 0) {
        this.handleFile(event.dataTransfer.files[0]);
        return;
      }
  
      const draggedText = event.dataTransfer.getData('text/plain');
      if (draggedText.startsWith('http')) {
        this.data.resource.Link = draggedText;
        this.data.resource.ResourceName = draggedText.split('/').pop() || 'Nuevo recurso';
      }
    }
  }
  

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  private handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.data.resource.ResourceName = file.name;
      this.data.resource.Link = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  
  updateSanitizedEmbed() {
    if (this.data.resource.Embed) {
      this.sanitizedEmbed = this.sanitizer.bypassSecurityTrustHtml(this.data.resource.Embed);
    } else {
      this.sanitizedEmbed = '';
    }
  }
}
