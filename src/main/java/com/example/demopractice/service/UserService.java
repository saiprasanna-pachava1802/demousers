package com.example.demopractice.service;

import com.example.demopractice.entity.User;
import java.util.List;


public interface UserService {

    User saveuser(User user);
    List<User> getUsers();

}