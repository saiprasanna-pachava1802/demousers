package com.example.demopractice.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demopractice.entity.User;

public interface UserDao extends JpaRepository<User, Integer> {

}