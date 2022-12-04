package com.academia.payment.bean;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
public class Course {
    public Course( Integer courseCode, String name, String description, Integer year, Integer term, Integer credits, Integer capacity) {

        this.courseCode = courseCode;
        this.name = name;
        this.description = description;
        this.year = year;
        this.term = term;
        this.credits = credits;
        this.capacity = capacity;
    }
    public Course() {
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courseId;

    @Column(nullable = false , unique = true)
    private Integer courseCode;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer term;

    @Column(nullable = false)
    private Integer credits;

    @Column(nullable = false)
    private Integer capacity;

    @ManyToMany (fetch = FetchType.EAGER)
    @JoinTable(name = "SpecialisationCourse",
            joinColumns = { @JoinColumn(name = "courseId") },
            inverseJoinColumns = { @JoinColumn(name = "specialisationId") })

    private List<Specialisation> specialisationList;


    public boolean addSpecialisation(Specialisation specialisation){
        if(specialisationList == null){
            specialisationList = new ArrayList<>();
        }
        try {
            return specialisationList.add(specialisation);
        }
        catch (Exception e){
            System.out.println(e.getLocalizedMessage());
            return false;
        }
   }




    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(Integer courseCode) {
        this.courseCode = courseCode;
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

    public Integer getTerm() {
        return term;
    }

    public void setTerm(Integer term) {
        this.term = term;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}
