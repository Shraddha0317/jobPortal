package com.jobportal.job_portal_backend.repository;

import com.jobportal.job_portal_backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByUserEmail(String userEmail);
}