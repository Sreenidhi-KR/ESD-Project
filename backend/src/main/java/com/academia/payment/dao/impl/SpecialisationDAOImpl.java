package com.academia.payment.dao.impl;

import com.academia.payment.bean.Course;
import com.academia.payment.bean.Specialisation;
import com.academia.payment.dao.SpecialisationDAO;
import com.academia.payment.util.HibernateSessionUtil;

import org.hibernate.HibernateException;

import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

public class SpecialisationDAOImpl implements SpecialisationDAO {



    @Override
    public List<Specialisation> getAllSpecialisations() {
        List<Specialisation> specialisationList = new ArrayList<>();
        try(Session session = HibernateSessionUtil.getSession()){
            specialisationList = session.createQuery("from Specialisation").list();

        }
        catch (HibernateException exception){
            System.out.println(exception.getLocalizedMessage());
        }
        return specialisationList;
    }


    @Override
    public boolean createSpecialisation(Specialisation specialisation) {
        Session session = null;
        try{
            session = HibernateSessionUtil.getSession();
            session.beginTransaction();

            session.persist(specialisation);
            session.getTransaction().commit();
            return true;
        }
        catch (Exception exception) {
            System.out.print(exception.getLocalizedMessage());
            session.getTransaction().rollback();
            return false;
        }
    }

    @Override
    public boolean updateSpecialisation(Specialisation specialisation) {
        try {
            int id = getSpecialisationID(specialisation.getCode());
            if(id == -1){
                return false;
            }
            Session session = HibernateSessionUtil.getSession();
            session.beginTransaction();
            Specialisation s = session.load(Specialisation.class, id);
            session.getTransaction().commit();

            s.setName(specialisation.getName());
            s.setYear(specialisation.getYear());
            s.setDescription(specialisation.getDescription());
            s.setCreditsRequired(specialisation.getCreditsRequired());

            session.beginTransaction();
            session.update(s);
            session.getTransaction().commit();

            return true;
        }
        catch (Exception exception) {
            System.out.print(exception.getLocalizedMessage());
            return false;
        }
    }

    @Override
    public boolean deleteSpecialisation(String specialisationCode) {
        try {
            int id = getSpecialisationID(specialisationCode);
            if(id == -1){
                return false;
            }
            Session session= HibernateSessionUtil.getSession();
            session.beginTransaction();
            Specialisation s = session.load(Specialisation.class, id);
            session.remove(s);
            session.getTransaction().commit();
            session.close();
            return true;
        }
        catch (Exception exception) {
            System.out.print(exception.getLocalizedMessage());
            return false;
        }
    }

    private Integer getSpecialisationID(String specialisationCode){
        try {
            Session session = HibernateSessionUtil.getSession();
            List<Object> result = new ArrayList<Object>(
                    session.createQuery(
                                    "FROM Specialisation WHERE code = :specialisationCode"
                            )
                            .setParameter("specialisationCode", specialisationCode)
                            .list()
            );

            if(result.size() > 0) {
                Specialisation s = (Specialisation) result.get(0);
                session.close();
                return s.getSpecialisationId();
            }
            session.close();

        }
        catch (HibernateException exception) {
            System.out.println(exception.getLocalizedMessage());
        }
        return -1;
    }

    @Override
    public List<Course> getCourses(String specialisationCode) {
        List<Course> courseList= new ArrayList<>();
        try{
            int id = getSpecialisationID(specialisationCode);
            if(id == -1){
                return courseList;
            }
            Session session = HibernateSessionUtil.getSession();
            Specialisation s = session.load(Specialisation.class, id);
            courseList = s.getCourseList();
            session.close();

        }
        catch (HibernateException exception) {
            System.out.println(exception.getLocalizedMessage());
        }

        return courseList;
    }
}