package com.academia.payment.service;

import com.academia.payment.bean.Admin;
import com.academia.payment.dao.impl.AdminDAOImpl;

public class AdminService {
    AdminDAOImpl adminDAO = new AdminDAOImpl();

    public Admin login(Admin admin){
        Admin loggedInAdmin = adminDAO.login(admin);

        // If no login happens, then return null
        if (loggedInAdmin == null)
            return null;

        return loggedInAdmin;
    }

}