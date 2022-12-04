package com.academia.payment.controller;

import com.academia.payment.bean.Admin;
import com.academia.payment.service.AdminService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("admin")
public class AdminController {
    AdminService adminService = new AdminService();

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(Admin admin) {
        Admin loggedInAdmin = adminService.login(admin);

        if (loggedInAdmin == null)
            return Response.status(401).build();
        else
            return Response.ok().entity(loggedInAdmin).build();
    }

}