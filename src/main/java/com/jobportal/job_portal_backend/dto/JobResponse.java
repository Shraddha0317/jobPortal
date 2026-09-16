package com.jobportal.job_portal_backend.dto;

import com.jobportal.job_portal_backend.entity.JobType;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobResponse {

    private Long jobId;
    private String title;
    private String description;
    private String companyName;
    private String location;
    private BigDecimal salary;
    private JobType jobType;
    private Integer experienceRequired;
    private LocalDateTime createdAt;
    private Long recruiterId;
}
