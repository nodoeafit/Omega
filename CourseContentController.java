package com.nodo.eafit.omega.controller;

import com.nodo.eafit.omega.entity.CourseContent;
import com.nodo.eafit.omega.entity.Unit;
import com.nodo.eafit.omega.service.CourseContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/course-content")
@CrossOrigin(origins = "*")
public class CourseContentController {
    
    @Autowired
    private CourseContentService courseContentService;
    
    // GET /api/course-content/name/{courseName} - Obtener contenido por nombre del curso
    @GetMapping("/name/{courseName}")
    public ResponseEntity<CourseContent> getCourseContentByName(@PathVariable String courseName) {
        Optional<CourseContent> content = courseContentService.getCourseContentByName(courseName);
        return content.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/course-content/{id} - Obtener contenido por ID
    @GetMapping("/{id}")
    public ResponseEntity<CourseContent> getCourseContentById(@PathVariable Long id) {
        Optional<CourseContent> content = courseContentService.getCourseContentById(id);
        return content.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /api/course-content - Crear nuevo contenido
    @PostMapping
    public ResponseEntity<CourseContent> createCourseContent(@RequestBody CourseContent courseContent) {
        CourseContent createdContent = courseContentService.createCourseContent(courseContent);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdContent);
    }
    
    // PUT /api/course-content/{id} - Actualizar contenido
    @PutMapping("/{id}")
    public ResponseEntity<CourseContent> updateCourseContent(@PathVariable Long id, @RequestBody CourseContent courseContent) {
        Optional<CourseContent> updatedContent = courseContentService.updateCourseContent(id, courseContent);
        return updatedContent.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE /api/course-content/{id} - Eliminar contenido
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourseContent(@PathVariable Long id) {
        boolean deleted = courseContentService.deleteCourseContent(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    // GET /api/course-content/search?courseName={courseName} - Buscar contenido por nombre
    @GetMapping("/search")
    public ResponseEntity<List<CourseContent>> searchCourseContentByName(@RequestParam String courseName) {
        List<CourseContent> contents = courseContentService.searchCourseContentByName(courseName);
        return ResponseEntity.ok(contents);
    }
    
    // GET /api/course-content/{id}/units - Obtener unidades de un curso
    @GetMapping("/{id}/units")
    public ResponseEntity<List<Unit>> getUnitsByCourseContentId(@PathVariable Long id) {
        List<Unit> units = courseContentService.getUnitsByCourseContentId(id);
        return ResponseEntity.ok(units);
    }
    
    // GET /api/course-content/exists/{courseName} - Verificar si existe contenido
    @GetMapping("/exists/{courseName}")
    public ResponseEntity<Boolean> courseContentExists(@PathVariable String courseName) {
        boolean exists = courseContentService.courseContentExists(courseName);
        return ResponseEntity.ok(exists);
    }
} 