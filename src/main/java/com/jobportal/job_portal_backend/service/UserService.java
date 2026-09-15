package com.jobportal.job_portal_backend.service;


import com.jobportal.job_portal_backend.dto.UserRequest;
import com.jobportal.job_portal_backend.dto.UserResponse;
import com.jobportal.job_portal_backend.entity.Users;
//import com.jobportal.job_portal_backend.exception.EmailNotFoundException;
import com.jobportal.job_portal_backend.exception.EmailAlreadyExistsException;
import com.jobportal.job_portal_backend.exception.UserNotFoundException;
import com.jobportal.job_portal_backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {


    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public UserResponse CreateUser(UserRequest request){

        if(userRepository.findByUserEmail(request.getEmail()).isPresent()){
            throw new EmailAlreadyExistsException("User with email already exists");
        }

       Users users =Users.builder()
                .userName(request.getName())
                .userEmail(request.getEmail())
                .userPassword(request.getPassword())
                .userRole(request.getRole())
                .build();

        Users savedUsers= userRepository.save(users);

        return UserResponse.builder().id(savedUsers.getUserId()).name(savedUsers.getUserName())
                .email(savedUsers.getUserEmail()).role(savedUsers.getUserRole()).build();
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> UserResponse.builder()
                        .id(user.getUserId())
                        .name(user.getUserName())
                        .email(user.getUserEmail())
                        .role(user.getUserRole())
                        .build())
                .toList();
    }

    public UserResponse getUserById(Long id){
        Users user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException
                ("User not found with this id"+id));
        return UserResponse.builder()
                .id(user.getUserId())
                .name(user.getUserName())
                .email(user.getUserEmail())
                .role(user.getUserRole())
                .build();


    }

    public  UserResponse updateUser(Long id, UserRequest request){
            Users user = userRepository.findById(id)
                    .orElseThrow(()-> new UserNotFoundException("User not found "));
            user.setUserName(request.getName());
            user.setUserEmail(request.getEmail());
            user.setUserPassword(request.getPassword());
            user.setUserRole(request.getRole());
            Users updatedUser = userRepository.save(user);


        return UserResponse.builder()
                .id(updatedUser.getUserId())
                .name(updatedUser.getUserName())
                .email(updatedUser.getUserEmail())
                .role(updatedUser.getUserRole())
                .build();
    }


    public  void deleteUser(Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException("User not found with id: "+id);
        }
        userRepository.deleteById(id);

    }
}
