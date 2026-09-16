package com.jobportal.job_portal_backend.specification;

import com.jobportal.job_portal_backend.entity.Job;
import com.jobportal.job_portal_backend.entity.JobType;
import org.springframework.data.jpa.domain.Specification;

public class JobSpecification {


    public static Specification<Job> hasLocation(String location) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("location"), location);
    }


    public static Specification<Job> hasKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            String pattern = "%" + keyword.toLowerCase() + "%";

            return criteriaBuilder.or(
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("title")),
                            pattern
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("description")),
                            pattern
                    )
            );
        };
    }

    public static Specification<Job> hasJobType(JobType jobType) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("jobType"), jobType);
    }


    public static Specification<Job> hasExperience(Integer experience) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(
                        root.get("experienceRequired"),
                        experience
                );
    }








}
