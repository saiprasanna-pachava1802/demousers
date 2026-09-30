package com.example.demopractice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demopractice.entity.User;
import com.example.demopractice.service.UserService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/saveuser")
    public User saveUser(@RequestBody User user) {

        return userService.saveuser(user);
    }
    
    @GetMapping("users")
    public List<User> getUsers() {
        return userService.getUsers();
    }
}