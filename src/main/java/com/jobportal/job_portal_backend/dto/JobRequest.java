package com.jobportal.job_portal_backend.dto;


import com.jobportal.job_portal_backend.entity.JobType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class JobRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String companyName;

    @NotBlank
    private String location;

    @Positive
    private BigDecimal salary;

    @NotNull
    private JobType jobType;

    @Min(0)
    private Integer experienceRequired;
}
