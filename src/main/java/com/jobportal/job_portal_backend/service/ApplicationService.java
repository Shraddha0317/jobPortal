package com.jobportal.job_portal_backend.service;


import com.jobportal.job_portal_backend.dto.ApplicationResponse;
import com.jobportal.job_portal_backend.entity.Application;
import com.jobportal.job_portal_backend.entity.Job;
import com.jobportal.job_portal_backend.entity.Users;
import com.jobportal.job_portal_backend.exception.DuplicateApplicationException;
import com.jobportal.job_portal_backend.exception.JobNotFoundException;
import com.jobportal.job_portal_backend.exception.UserNotFoundException;
import com.jobportal.job_portal_backend.repository.ApplicationRepository;
import com.jobportal.job_portal_backend.repository.JobRepository;
import com.jobportal.job_portal_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {


    private  final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;

    }

    public ApplicationResponse applyForJob(Long jobId,String email){
         Job job = jobRepository.findById(jobId).orElseThrow(()-> new JobNotFoundException("Job Not found with jobId"+ jobId));

        Users applicant= userRepository.findByUserEmail(email).orElseThrow(()->new UserNotFoundException("user not found with email"+ email));


        if (applicationRepository.existsByJobJobIdAndApplicantUserId(
                jobId,
                applicant.getUserId())) {

            throw new DuplicateApplicationException("You have already applied for this job");
        }

        Application application = Application.builder()
                .job(job)
                .applicant(applicant)
                .build();
       Application SavedApplication= applicationRepository.save(application);
      //  System.out.println("APPLICATION ID = " + SavedApplication.getApplicationId());

        return ApplicationResponse.builder()
                .applicationId(SavedApplication.getApplicationId())
                .jobId(SavedApplication.getJob().getJobId())
                .applicantId(SavedApplication.getApplicant().getUserId())
                .applicantName(SavedApplication.getApplicant().getUserName())
                .jobTitle(SavedApplication.getJob().getTitle())
                .status(SavedApplication.getStatus())
                .appliedAt(SavedApplication.getAppliedAt())
                .build();

    }



    public List<ApplicationResponse> getMyApplications(String email) {

        Users applicant = userRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("Applicant not found"));

        return applicationRepository.findByApplicantUserId(applicant.getUserId())
                .stream()
                .map(application -> ApplicationResponse.builder()
                        .applicationId(application.getApplicationId())
                        .jobId(application.getJob().getJobId())
                        .jobTitle(application.getJob().getTitle())
                        .applicantId(application.getApplicant().getUserId())
                        .applicantName(application.getApplicant().getUserName())
                        .status(application.getStatus())
                        .appliedAt(application.getAppliedAt())
                        .build())
                .toList();
    }
}
