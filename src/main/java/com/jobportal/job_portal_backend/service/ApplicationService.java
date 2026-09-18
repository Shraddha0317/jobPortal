package com.jobportal.job_portal_backend.service;


import com.jobportal.job_portal_backend.dto.ApplicationResponse;
import com.jobportal.job_portal_backend.entity.*;
import com.jobportal.job_portal_backend.exception.*;
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

        return mapToResponse(SavedApplication);

    }



    public List<ApplicationResponse> getMyApplications(String email) {

        Users applicant = userRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("Applicant not found"));

        return applicationRepository.findByApplicantUserId(applicant.getUserId())
                .stream()
                .map(this::mapToResponse).toList();
    }

    public List<ApplicationResponse>getRecruiterApplications(String email){
        Users recruiter= userRepository.findByUserEmail(email).orElseThrow(()->new UserNotFoundException("Recruiter not found with email"+ email));
        System.out.println(recruiter.getUserId());
        return applicationRepository.findByJobRecruiterUserId(recruiter.getUserId()).stream()
                .map(this::mapToResponse).toList();


    }


    public  ApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatus status, String email){

        Users recruiter = userRepository.findByUserEmail(email).orElseThrow(()-> new UserNotFoundException("Recruiter not found with email"+ email));

       Application application= applicationRepository.findByApplicationIdAndJobRecruiterUserId(applicationId,recruiter.getUserId()).orElseThrow(()-> new ApplicationNotFoundException("Application not found or you are not authorized to update this application"));



        validateStatusTransition(
                application.getStatus(),
                status
        );

        application.setStatus(status);


        Application updatedApplication =
                applicationRepository.save(application);

       return mapToResponse(updatedApplication);


    }

    private void validateStatusTransition(
            ApplicationStatus currentStatus,
            ApplicationStatus newStatus) {

        if (currentStatus == ApplicationStatus.APPLIED
                && newStatus != ApplicationStatus.UNDER_REVIEW) {
            throw new InvalidApplicationStatusException(
                    "Application must move to UNDER_REVIEW first");
        }

        if (currentStatus == ApplicationStatus.UNDER_REVIEW
                && newStatus != ApplicationStatus.SHORTLISTED
                && newStatus != ApplicationStatus.REJECTED) {
            throw new InvalidApplicationStatusException(
                    "Application can only be SHORTLISTED or REJECTED");
        }

        if (currentStatus == ApplicationStatus.SHORTLISTED
                && newStatus != ApplicationStatus.HIRED
                && newStatus != ApplicationStatus.REJECTED) {
            throw new InvalidApplicationStatusException(
                    "Application can only be HIRED or REJECTED");
        }

        if (currentStatus == ApplicationStatus.REJECTED
                || currentStatus == ApplicationStatus.HIRED) {
            throw new InvalidApplicationStatusException(
                    "Application status cannot be changed");
        }
    }

    private ApplicationResponse mapToResponse(Application application) {

        return ApplicationResponse.builder()
                .applicationId(application.getApplicationId())
                .jobId(application.getJob().getJobId())
                .jobTitle(application.getJob().getTitle())
                .applicantId(application.getApplicant().getUserId())
                .applicantName(application.getApplicant().getUserName())
                .status(application.getStatus())
                .appliedAt(application.getAppliedAt())
                .build();
    }

}
