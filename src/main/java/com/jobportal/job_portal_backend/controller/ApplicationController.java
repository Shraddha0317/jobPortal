package com.jobportal.job_portal_backend.controller;


import com.jobportal.job_portal_backend.dto.ApplicationResponse;
import com.jobportal.job_portal_backend.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {


    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }


    @PreAuthorize("hasRole('APPLICANT')")
    @PostMapping("/{jobId}")
    public ApplicationResponse applyForJob(@PathVariable Long jobId) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email= authentication.getName();
        return applicationService.applyForJob(jobId,email);
    }



    @GetMapping("/my-applications")
    @PreAuthorize("hasRole('APPLICANT')")
    public List<ApplicationResponse> getMyApplications() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return applicationService.getMyApplications(email);
    }

}
