package com.jobportal.job_portal_backend.dto;

import com.jobportal.job_portal_backend.entity.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponse {

    private Long applicationId;
    private Long jobId;
    private String jobTitle;
    private Long applicantId;
    private String applicantName;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
}