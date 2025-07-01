package com.nodo.eafit.omega.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "units")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Unit {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Integer unitNumber;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_content_id")
    private CourseContent courseContent;
    
    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Resource> resources;
} 