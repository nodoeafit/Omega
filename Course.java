package com.nodo.eafit.omega.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 255)
    private String title;
    
    @Column(length = 500)
    private String imageUrl;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Modality modality;
    
    @Column(length = 255)
    private String certification;
    
    @Column(columnDefinition = "TEXT")
    private String duration;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private Double price;
    
    public enum Modality {
        VIRTUAL, PRESENCIAL
    }
} 