package com.academia.payment.dao;

import com.academia.payment.bean.Admin;

public interface AdminDAO {
    Admin login(Admin admin);
    void createAdmin(Admin admin);
}
