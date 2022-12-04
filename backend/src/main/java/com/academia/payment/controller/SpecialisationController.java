package com.academia.payment.controller;


import com.academia.payment.bean.Course;
import com.academia.payment.bean.Specialisation;
import com.academia.payment.service.SpecialisationService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("specialisation")
public class SpecialisationController {
    SpecialisationService specialisationService = new SpecialisationService();

    @GET
    @Path("/getCourses")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCourses(@QueryParam("specialisationCode") String specialisationCode) {
        List<Course> courseList = specialisationService.getCourses(specialisationCode);
        return Response.ok().entity(courseList).build();
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllSpecialisations() {
        List<Specialisation> courseList = specialisationService.getAllSpecialisations();
        return Response.ok().entity(courseList).build();
    }

    @POST
    @Path("/create")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createSpecialisation(Specialisation specialisation) {
        boolean result = specialisationService.createSpecialisation(specialisation);
        if (!result)
            return Response.status(400).build();
        else
            return Response.ok().build();
    }

    @PATCH
    @Path("/update")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateSpecialisation(Specialisation specialisation) {
        boolean result = specialisationService.updateSpecialisation(specialisation);
        if (!result)
            return Response.status(400).build();
        else
            return Response.ok().build();
    }


    @DELETE
    @Path("/delete")
    @Produces(MediaType.TEXT_PLAIN)
    public Response deleteBill(@QueryParam("specialisationCode") String specialisationCode) {
        Boolean result = specialisationService.removeSpecialisation(specialisationCode);
        if (result)
            return Response.ok().build();
        else
            return Response.status(400).build();
    }
}