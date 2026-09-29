package com.example.demopractice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demopractice.dao.UserDao;
import com.example.demopractice.entity.User;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public User saveuser(User user) {

        return userDao.save(user);
    }
}