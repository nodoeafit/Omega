package com.nodo.eafit.omega.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resource {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 500)
    private String resourceName;
    
    @Column(length = 1000)
    private String link;
    
    @Column(columnDefinition = "TEXT")
    private String embed;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id")
    private Unit unit;
} 