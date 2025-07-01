package com.nodo.eafit.omega.service;

import com.nodo.eafit.omega.dto.CourseDTO;
import com.nodo.eafit.omega.entity.Course;
import com.nodo.eafit.omega.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {
    
    @Autowired
    private CourseRepository courseRepository;
    
    // Obtener todos los cursos
    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    // Obtener curso por ID
    public Optional<CourseDTO> getCourseById(Long id) {
        return courseRepository.findById(id)
                .map(CourseDTO::fromEntity);
    }
    
    // Crear nuevo curso
    public CourseDTO createCourse(CourseDTO courseDTO) {
        Course course = courseDTO.toEntity();
        Course savedCourse = courseRepository.save(course);
        return CourseDTO.fromEntity(savedCourse);
    }
    
    // Actualizar curso existente
    public Optional<CourseDTO> updateCourse(Long id, CourseDTO courseDTO) {
        return courseRepository.findById(id)
                .map(existingCourse -> {
                    courseDTO.setId(id);
                    Course updatedCourse = courseDTO.toEntity();
                    Course savedCourse = courseRepository.save(updatedCourse);
                    return CourseDTO.fromEntity(savedCourse);
                });
    }
    
    // Eliminar curso
    public boolean deleteCourse(Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Buscar cursos por modalidad
    public List<CourseDTO> getCoursesByModality(String modality) {
        try {
            Course.Modality modalityEnum = Course.Modality.valueOf(modality.toUpperCase());
            return courseRepository.findByModality(modalityEnum).stream()
                    .map(CourseDTO::fromEntity)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }
    
    // Buscar cursos por título
    public List<CourseDTO> searchCoursesByTitle(String title) {
        return courseRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    // Buscar cursos por rango de precio
    public List<CourseDTO> getCoursesByPriceRange(Double minPrice, Double maxPrice) {
        return courseRepository.findByPriceBetween(minPrice, maxPrice).stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    // Obtener cursos ordenados por precio ascendente
    public List<CourseDTO> getCoursesOrderedByPriceAsc() {
        return courseRepository.findAllByOrderByPriceAsc().stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    // Obtener cursos ordenados por precio descendente
    public List<CourseDTO> getCoursesOrderedByPriceDesc() {
        return courseRepository.findAllByOrderByPriceDesc().stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    // Obtener cursos ordenados por título
    public List<CourseDTO> getCoursesOrderedByTitle() {
        return courseRepository.findAllByOrderByTitleAsc().stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    // Verificar si existe un curso
    public boolean courseExists(Long id) {
        return courseRepository.existsById(id);
    }
} 