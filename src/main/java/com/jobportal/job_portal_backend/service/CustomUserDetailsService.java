package com.jobportal.job_portal_backend.service;

import com.jobportal.job_portal_backend.entity.Users;
import com.jobportal.job_portal_backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Users user = userRepository.findByUserEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not found with email: " + email));


        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUserEmail())
                .password(user.getUserPassword())
                .roles(user.getUserRole().name())
                .build();
    }
}
