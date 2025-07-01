package com.nodo.eafit.omega.repository;

import com.nodo.eafit.omega.entity.CourseContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseContentRepository extends JpaRepository<CourseContent, Long> {
    
    // Buscar contenido por nombre del curso
    Optional<CourseContent> findByCourseName(String courseName);
    
    // Buscar contenido por nombre del curso (búsqueda parcial)
    @Query("SELECT cc FROM CourseContent cc WHERE LOWER(cc.courseName) LIKE LOWER(CONCAT('%', :courseName, '%'))")
    List<CourseContent> findByCourseNameContainingIgnoreCase(@Param("courseName") String courseName);
    
    // Verificar si existe contenido para un curso
    boolean existsByCourseName(String courseName);
} 