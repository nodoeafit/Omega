package com.nodo.eafit.omega.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "course_contents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseContent {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 255)
    private String courseName;
    
    @OneToMany(mappedBy = "courseContent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Unit> units;
} 