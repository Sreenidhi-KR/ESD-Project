package com.academia.payment.dao.impl;

import com.academia.payment.util.HibernateSessionUtil;
import com.academia.payment.dao.AdminDAO;
import com.academia.payment.bean.Admin;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class AdminDAOImpl implements AdminDAO {
    @Override
    public Admin login(Admin admin) {
        try (Session session = HibernateSessionUtil.getSession();){
            String adminEmail = admin.getEmail();
            String adminPassword = admin.getPassword();

            List<Object> result = new ArrayList<Object>(
                session.createQuery(
                        "FROM Admin WHERE email = :adminEmail and password = :adminPassword"
                        )
                        .setParameter("adminEmail", adminEmail)
                        .setParameter("adminPassword", adminPassword)
                        .list()
            );

            // If no valid Student found, return null so that login failure is understood
            if (result.size() == 0)
                return null;
            else
                return (Admin) result.get(0);
        }
        catch (HibernateException exception) {
            System.out.print(exception.getLocalizedMessage());
        }

        return null;
    }

    @Override
    public void createAdmin(Admin admin) {
        try (Session session = HibernateSessionUtil.getSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(admin);
            transaction.commit();
        }
        catch (HibernateException exception) {
            System.out.print(exception.getLocalizedMessage());
        }
    }
}