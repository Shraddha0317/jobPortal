package com.jobportal.job_portal_backend.service;


import com.jobportal.job_portal_backend.dto.JobRequest;
import com.jobportal.job_portal_backend.dto.JobResponse;
import com.jobportal.job_portal_backend.entity.Job;
import com.jobportal.job_portal_backend.entity.JobType;
import com.jobportal.job_portal_backend.entity.Users;
import com.jobportal.job_portal_backend.exception.JobNotFoundException;
import com.jobportal.job_portal_backend.exception.UserNotFoundException;
import com.jobportal.job_portal_backend.repository.JobRepository;
import com.jobportal.job_portal_backend.repository.UserRepository;
import com.jobportal.job_portal_backend.specification.JobSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class JobService {

    private  final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasRole('RECRUITER')")
    public JobResponse createJob(JobRequest request){
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

       Users recruiter =  userRepository.findByUserEmail(email)
               .orElseThrow(() -> new UserNotFoundException("Recruiter not found"));


    Job job=  Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .companyName(request.getCompanyName())
                .location(request.getLocation())
                .salary(request.getSalary())
                .jobType(request.getJobType())
                .experienceRequired(request.getExperienceRequired())
                .recruiter(recruiter)
                .build();
    Job SavedJob= jobRepository.save(job);


   return mapToResponse(SavedJob);
    }


    public List<JobResponse> getAllJobs(){

        return jobRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    //---------

    public JobResponse getJobById(Long id) {
      Job job=  jobRepository.findById(id).orElseThrow(()-> new JobNotFoundException("Job not found with id: "+id));

      return mapToResponse(job);


    }




//-------------

    public Page<JobResponse> searchJobs(
            String keyword,
            String location,
            JobType jobType,
            Integer experience,
            int page,
            int size) {

        Specification<Job> specification =
                (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();

        if (keyword != null && !keyword.isBlank()) {
            specification = specification.and(
                    JobSpecification.hasKeyword(keyword)
            );
        }

        if (location != null && !location.isBlank()) {
            specification = specification.and(
                    JobSpecification.hasLocation(location)
            );
        }

        if (jobType != null) {
            specification = specification.and(
                    JobSpecification.hasJobType(jobType)
            );
        }

        if (experience != null) {
            specification = specification.and(
                    JobSpecification.hasExperience(experience)
            );
        }

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("createdAt").descending()
        );

        return jobRepository.findAll(specification, pageable)
                .map(job -> mapToResponse(job));
    }





    private JobResponse mapToResponse(Job job) {
        return JobResponse.builder()
                .jobId(job.getJobId())
                .title(job.getTitle())
                .description(job.getDescription())
                .companyName(job.getCompanyName())
                .location(job.getLocation())
                .salary(job.getSalary())
                .jobType(job.getJobType())
                .experienceRequired(job.getExperienceRequired())
                .createdAt(job.getCreatedAt())
                .recruiterId(job.getRecruiter().getUserId())
                .build();
    }







}
