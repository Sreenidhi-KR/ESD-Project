package com.academia.payment.bean;

import jakarta.persistence.*;

@Entity
@Table
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer adminId;


    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;



    public Admin() {
    }

    public Admin(String email, String password) {

        this.email = email;
        this.password = password;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer studentId) {
        this.adminId = studentId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}