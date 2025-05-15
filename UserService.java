package com.HelpingHands.service;


import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.User;

public interface UserService {
    public User findUserById(Long userId) throws UserException;
    public User findUserByJwt(String jwt) throws UserException;
    public User findUserByEmail(String email) throws UserException;
}