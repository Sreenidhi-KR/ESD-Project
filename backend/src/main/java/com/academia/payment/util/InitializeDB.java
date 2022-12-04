package com.academia.payment.util;


import com.academia.payment.bean.Course;
import com.academia.payment.bean.Specialisation;
import com.academia.payment.bean.Admin;
import org.hibernate.Session;



public class InitializeDB {
    public static void main(String[] args) {
        Session session = HibernateSessionUtil.getSession();
        try{
            session.beginTransaction();
            Admin admin = new Admin("rsri1998@gmail.com","1234");
            session.persist(admin);


            Specialisation s = new Specialisation("AI","Machine Learning ","Core ML", 2022,24);
            session.persist(s);
            Course c1 = new Course(511,"Basics of ML","abc",2022,1,4,100);
            session.persist(c1);
            Course c2 = new Course(512,"Maths for ML","abc",2022,1,4,100);
            Course c3 = new Course(611,"Basics of AI","abc",2022,1,4,100);
            session.persist(c1);
            Course c4 = new Course(612,"Algorithms","abc",2022,1,4,100);
            Course c5 = new Course(613,"Software Systems","abc",2022,1,4,100);
            session.persist(c2);
            session.persist(c3);
            session.persist(c4);
            session.persist(c5);

            s.addCourse(c1);
            s.addCourse(c2);
            s.addCourse(c3);

            Specialisation s2 = new Specialisation("CS","Computer Science","Core CS", 2022,24);
            session.persist(s2);

            s2.addCourse(c3);
            s2.addCourse(c4);
            s2.addCourse(c5);



            session.getTransaction().commit();


            System.out.println("Done");
        }
        catch (Exception e){
            System.out.println(e.getLocalizedMessage());

        }
        finally {
            session.close();
        }
    }
}
