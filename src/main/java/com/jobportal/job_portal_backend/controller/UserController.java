package com.jobportal.job_portal_backend.controller;


import com.jobportal.job_portal_backend.dto.LoginRequest;
import com.jobportal.job_portal_backend.dto.LoginResponse;
import com.jobportal.job_portal_backend.dto.UserRequest;
import com.jobportal.job_portal_backend.dto.UserResponse;
import com.jobportal.job_portal_backend.entity.Users;
import com.jobportal.job_portal_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public UserResponse createUser(@Valid @RequestBody UserRequest users){
        return userService.CreateUser(users);
    }

    @GetMapping("/getAllUsers")
    public List<UserResponse> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getUserById/{id}")
    public UserResponse getUserById(@PathVariable Long id){
        return userService.getUserById(id);

    }

    @PutMapping("/updateUser/{id}")
    public UserResponse updateUser(@PathVariable Long id, @Valid @RequestBody UserRequest request){
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser( @PathVariable Long id){
        userService.deleteUser(id);
    }

    @PostMapping("/login")
    public LoginResponse  login( @Valid @RequestBody LoginRequest request){

       return userService.login(request);

    }
}
