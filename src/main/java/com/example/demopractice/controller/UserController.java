package com.example.demopractice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demopractice.entity.User;
import com.example.demopractice.service.UserService;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/saveuser")
    public User saveUser(@RequestBody User user) {

        return userService.saveuser(user);
    }
}