package com.academia.payment.dao;

import com.academia.payment.bean.Course;
import com.academia.payment.bean.Specialisation;

import java.util.List;

public interface SpecialisationDAO {
    List<Course> getCourses(String specialisationCode);

    List<Specialisation> getAllSpecialisations();
    boolean createSpecialisation(Specialisation specialisation);
    boolean updateSpecialisation(Specialisation specialisation);

    boolean deleteSpecialisation(String specialisationCode);

}
