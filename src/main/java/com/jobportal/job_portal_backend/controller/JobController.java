package com.jobportal.job_portal_backend.controller;


import com.jobportal.job_portal_backend.dto.JobRequest;
import com.jobportal.job_portal_backend.dto.JobResponse;
import com.jobportal.job_portal_backend.entity.JobType;
import com.jobportal.job_portal_backend.service.JobService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;


    public JobController(JobService jobService) {
        this.jobService = jobService;
    }


    @PostMapping("/addJob")
    public JobResponse createJob(@Valid @RequestBody JobRequest jobRequest){
        return jobService.createJob(jobRequest);
    }


    @GetMapping
    public List<JobResponse> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public JobResponse GetJobById(@PathVariable Long id){

        return jobService.getJobById(id);

    }


    @GetMapping("/search")
    public Page<JobResponse> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) Integer experience,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return jobService.searchJobs(
                keyword,
                location,
                jobType,
                experience,
                page,
                size
        );
    }
}
