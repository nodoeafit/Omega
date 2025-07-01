package com.nodo.eafit.omega.repository;

import com.nodo.eafit.omega.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {
    
    // Buscar unidades por número de unidad
    List<Unit> findByUnitNumber(Integer unitNumber);
    
    // Buscar unidades por curso
    @Query("SELECT u FROM Unit u WHERE u.courseContent.id = :courseContentId ORDER BY u.unitNumber")
    List<Unit> findByCourseContentIdOrderByUnitNumber(@Param("courseContentId") Long courseContentId);
    
    // Buscar unidades por número de unidad y curso
    @Query("SELECT u FROM Unit u WHERE u.courseContent.id = :courseContentId AND u.unitNumber = :unitNumber")
    List<Unit> findByCourseContentIdAndUnitNumber(@Param("courseContentId") Long courseContentId, @Param("unitNumber") Integer unitNumber);
} 