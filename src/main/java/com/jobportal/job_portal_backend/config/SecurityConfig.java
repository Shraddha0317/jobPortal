package com.jobportal.job_portal_backend.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig     {



    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws  Exception{

        http.csrf(csrf->csrf.disable())
                .sessionManagement(session->session.
                        sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/users/add", "/api/users/login").permitAll()
                                .anyRequest().authenticated());

        return http.build();
    }
}
