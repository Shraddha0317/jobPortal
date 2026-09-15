package com.jobportal.job_portal_backend.dto;

import com.jobportal.job_portal_backend.entity.Role;
import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class LoginResponse {
    private Long id;
    private String  name;
    private String email;
    private Role role;
    private String token;
}
