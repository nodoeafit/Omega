package com.nodo.eafit.omega.repository;

import com.nodo.eafit.omega.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    
    // Buscar recursos por nombre
    List<Resource> findByResourceNameContainingIgnoreCase(String resourceName);
    
    // Buscar recursos por unidad
    @Query("SELECT r FROM Resource r WHERE r.unit.id = :unitId ORDER BY r.id")
    List<Resource> findByUnitIdOrderById(@Param("unitId") Long unitId);
    
    // Buscar recursos por curso (a través de la unidad)
    @Query("SELECT r FROM Resource r WHERE r.unit.courseContent.id = :courseContentId ORDER BY r.unit.unitNumber, r.id")
    List<Resource> findByCourseContentIdOrderByUnitAndId(@Param("courseContentId") Long courseContentId);
    
    // Buscar recursos por unidad y nombre
    @Query("SELECT r FROM Resource r WHERE r.unit.id = :unitId AND LOWER(r.resourceName) LIKE LOWER(CONCAT('%', :resourceName, '%'))")
    List<Resource> findByUnitIdAndResourceNameContainingIgnoreCase(@Param("unitId") Long unitId, @Param("resourceName") String resourceName);
} 