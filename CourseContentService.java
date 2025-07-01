package com.nodo.eafit.omega.service;

import com.nodo.eafit.omega.entity.CourseContent;
import com.nodo.eafit.omega.entity.Unit;
import com.nodo.eafit.omega.repository.CourseContentRepository;
import com.nodo.eafit.omega.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseContentService {
    
    @Autowired
    private CourseContentRepository courseContentRepository;
    
    @Autowired
    private UnitRepository unitRepository;
    
    // Obtener contenido por nombre del curso
    public Optional<CourseContent> getCourseContentByName(String courseName) {
        return courseContentRepository.findByCourseName(courseName);
    }
    
    // Obtener contenido por ID
    public Optional<CourseContent> getCourseContentById(Long id) {
        return courseContentRepository.findById(id);
    }
    
    // Crear nuevo contenido de curso
    public CourseContent createCourseContent(CourseContent courseContent) {
        return courseContentRepository.save(courseContent);
    }
    
    // Actualizar contenido de curso
    public Optional<CourseContent> updateCourseContent(Long id, CourseContent courseContent) {
        return courseContentRepository.findById(id)
                .map(existingContent -> {
                    courseContent.setId(id);
                    return courseContentRepository.save(courseContent);
                });
    }
    
    // Eliminar contenido de curso
    public boolean deleteCourseContent(Long id) {
        if (courseContentRepository.existsById(id)) {
            courseContentRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Buscar contenido por nombre (búsqueda parcial)
    public List<CourseContent> searchCourseContentByName(String courseName) {
        return courseContentRepository.findByCourseNameContainingIgnoreCase(courseName);
    }
    
    // Obtener unidades de un curso
    public List<Unit> getUnitsByCourseContentId(Long courseContentId) {
        return unitRepository.findByCourseContentIdOrderByUnitNumber(courseContentId);
    }
    
    // Verificar si existe contenido para un curso
    public boolean courseContentExists(String courseName) {
        return courseContentRepository.existsByCourseName(courseName);
    }
} 