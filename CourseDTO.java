package com.nodo.eafit.omega.dto;

import com.nodo.eafit.omega.entity.Course;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private Long id;
    private String title;
    private String imageUrl;
    private String modality;
    private String certification;
    private String duration;
    private String description;
    private Double price;
    
    public static CourseDTO fromEntity(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setImageUrl(course.getImageUrl());
        dto.setModality(course.getModality().name());
        dto.setCertification(course.getCertification());
        dto.setDuration(course.getDuration());
        dto.setDescription(course.getDescription());
        dto.setPrice(course.getPrice());
        return dto;
    }
    
    public Course toEntity() {
        Course course = new Course();
        course.setId(this.id);
        course.setTitle(this.title);
        course.setImageUrl(this.imageUrl);
        course.setModality(Course.Modality.valueOf(this.modality));
        course.setCertification(this.certification);
        course.setDuration(this.duration);
        course.setDescription(this.description);
        course.setPrice(this.price);
        return course;
    }
} 