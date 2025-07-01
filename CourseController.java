package com.nodo.eafit.omega.controller;

import com.nodo.eafit.omega.dto.CourseDTO;
import com.nodo.eafit.omega.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {
    
    @Autowired
    private CourseService courseService;
    
    // GET /api/courses - Obtener todos los cursos
    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        List<CourseDTO> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }
    
    // GET /api/courses/{id} - Obtener curso por ID
    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) {
        Optional<CourseDTO> course = courseService.getCourseById(id);
        return course.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /api/courses - Crear nuevo curso
    @PostMapping
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO) {
        CourseDTO createdCourse = courseService.createCourse(courseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
    }
    
    // PUT /api/courses/{id} - Actualizar curso existente
    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Long id, @RequestBody CourseDTO courseDTO) {
        Optional<CourseDTO> updatedCourse = courseService.updateCourse(id, courseDTO);
        return updatedCourse.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE /api/courses/{id} - Eliminar curso
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        boolean deleted = courseService.deleteCourse(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    // GET /api/courses/search?title={title} - Buscar cursos por título
    @GetMapping("/search")
    public ResponseEntity<List<CourseDTO>> searchCoursesByTitle(@RequestParam String title) {
        List<CourseDTO> courses = courseService.searchCoursesByTitle(title);
        return ResponseEntity.ok(courses);
    }
    
    // GET /api/courses/modality/{modality} - Obtener cursos por modalidad
    @GetMapping("/modality/{modality}")
    public ResponseEntity<List<CourseDTO>> getCoursesByModality(@PathVariable String modality) {
        List<CourseDTO> courses = courseService.getCoursesByModality(modality);
        return ResponseEntity.ok(courses);
    }
    
    // GET /api/courses/price-range - Obtener cursos por rango de precio
    @GetMapping("/price-range")
    public ResponseEntity<List<CourseDTO>> getCoursesByPriceRange(
            @RequestParam Double minPrice, 
            @RequestParam Double maxPrice) {
        List<CourseDTO> courses = courseService.getCoursesByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(courses);
    }
    
    // GET /api/courses/sort/price-asc - Obtener cursos ordenados por precio ascendente
    @GetMapping("/sort/price-asc")
    public ResponseEntity<List<CourseDTO>> getCoursesOrderedByPriceAsc() {
        List<CourseDTO> courses = courseService.getCoursesOrderedByPriceAsc();
        return ResponseEntity.ok(courses);
    }
    
    // GET /api/courses/sort/price-desc - Obtener cursos ordenados por precio descendente
    @GetMapping("/sort/price-desc")
    public ResponseEntity<List<CourseDTO>> getCoursesOrderedByPriceDesc() {
        List<CourseDTO> courses = courseService.getCoursesOrderedByPriceDesc();
        return ResponseEntity.ok(courses);
    }
    
    // GET /api/courses/sort/title - Obtener cursos ordenados por título
    @GetMapping("/sort/title")
    public ResponseEntity<List<CourseDTO>> getCoursesOrderedByTitle() {
        List<CourseDTO> courses = courseService.getCoursesOrderedByTitle();
        return ResponseEntity.ok(courses);
    }
    
    // GET /api/courses/exists/{id} - Verificar si existe un curso
    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> courseExists(@PathVariable Long id) {
        boolean exists = courseService.courseExists(id);
        return ResponseEntity.ok(exists);
    }
} 