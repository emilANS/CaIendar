package com.caiendar.Caiendar.controller;

import com.caiendar.Caiendar.DTO.UserRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;

import com.caiendar.Caiendar.model.User;
import com.caiendar.Caiendar.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LoginRegistrationController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/createUser")
    public ResponseEntity<?> login(@RequestBody User newUser) {

        if (userRepository.existsByUsername(newUser.getUsername()) || newUser.getUsername().length() > 10 || newUser.getPassword().length() > 10) {
            return ResponseEntity.badRequest().body("This username already exists or is too long");
        } else {

            userRepository.save(newUser);

            return ResponseEntity.ok("Account created Successfully");

        }
    }

    @PostMapping("/loginUser")
    public ResponseEntity<?> postMethodName(@RequestBody UserRequestDTO userInfo) {

        Long idOfUser = userRepository.findByUsernameAndPassword(userInfo.getUsername(), userInfo.getPassword()).getId();

        if (idOfUser != null) {
            return ResponseEntity.ok(idOfUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

}
