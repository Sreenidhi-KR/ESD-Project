package com.academia.payment.service;

import com.academia.payment.bean.Course;
import com.academia.payment.bean.Specialisation;
import com.academia.payment.dao.impl.SpecialisationDAOImpl;

import java.util.List;

public class SpecialisationService {
    SpecialisationDAOImpl specialisationDAO = new SpecialisationDAOImpl();

    public List<Course> getCourses(String specialisationCode){
        List<Course> courseList = specialisationDAO.getCourses(specialisationCode);
        return courseList;
    }
    public List<Specialisation> getAllSpecialisations(){
        List<Specialisation> specialisationList = specialisationDAO.getAllSpecialisations();
        return specialisationList;
    }

    public boolean createSpecialisation(Specialisation specialisation){
        return specialisationDAO.createSpecialisation(specialisation);
    }

    public boolean updateSpecialisation(Specialisation specialisation){
        return specialisationDAO.updateSpecialisation(specialisation);
    }

    public boolean removeSpecialisation(String specialisationCode){
        return specialisationDAO.deleteSpecialisation(specialisationCode);
    }

}