package com.academia.payment.bean;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
public class Specialisation {

    public Specialisation( String code, String name, String description, Integer year, Integer creditsRequired) {

        this.code = code;
        this.name = name;
        this.description = description;
        this.year = year;
        this.creditsRequired = creditsRequired;
    }

    public Specialisation() {

    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer specialisationId;


    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer creditsRequired;

    @ManyToMany (fetch = FetchType.EAGER)
    @JoinTable(name = "SpecialisationCourse",

            joinColumns = { @JoinColumn(name = "specialisationId") },
            inverseJoinColumns = { @JoinColumn(name = "courseId") })
    private List<Course> courseList;

    public boolean addCourse(Course course){
        if(courseList == null){
            courseList = new ArrayList<>();
        }
        try {
            return courseList.add(course);
        }
        catch (Exception e){
            System.out.println(e.getLocalizedMessage());
            return false;
        }

    }






    public Integer getSpecialisationId() {
        return specialisationId;
    }

    public void setSpecialisationId(Integer specialisationId) {
        this.specialisationId = specialisationId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getCreditsRequired() {
        return creditsRequired;
    }

    public void setCreditsRequired(Integer creditsRequired) {
        this.creditsRequired = creditsRequired;
    }

    public List<Course> getCourseList() {
        return courseList;
    }

    public void setCourseList(List<Course> courseList) {
        this.courseList = courseList;
    }

    @Override
    public String toString() {
        return "Specialisation{" +
                "specialisationId=" + specialisationId +
                ", code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", year=" + year +
                ", creditsRequired=" + creditsRequired +
                '}';
    }
}
