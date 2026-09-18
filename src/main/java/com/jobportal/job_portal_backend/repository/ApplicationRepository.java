package com.jobportal.job_portal_backend.repository;

import com.jobportal.job_portal_backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    boolean existsByJobJobIdAndApplicantUserId(
            Long jobId,
            Long applicantId
    );


    List<Application> findByApplicantUserId(Long applicantId);

    List<Application> findByJobRecruiterUserId(Long recruiterId);

    Optional<Application> findByApplicationIdAndJobRecruiterUserId(
            Long applicationId,
            Long recruiterId
    );
}
