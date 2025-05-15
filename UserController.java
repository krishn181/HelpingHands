package com.HelpingHands.controller;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HelpingHands.model.User;
import com.HelpingHands.Repository.UserRepository;
import com.HelpingHands.response.AuthResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

//    private UserService userService;
//    @GetMapping("/profile")
//    public ResponseEntity<User> getUserProfileHandler(
//            @RequestHeader ("Authorization") String jwt)throws UserException{
//        User user = userService.findUserByJwt(jwt);
//        return  new ResponseEntity<User>(user,HttpStatus.ACCEPTED);
//    }


    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            // Get the current authentication from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            logger.debug("Authentication: {}", authentication);

            if (authentication == null || !authentication.isAuthenticated()) {
                logger.warn("User not authenticated");
                return new ResponseEntity<>(new AuthResponse("User not authenticated", false), HttpStatus.UNAUTHORIZED);
            }

            // In your JwtValidator, you're storing email as the principal
            String email = authentication.getName();
            logger.debug("Looking up user by email: {}", email);

            // Find user by email
            User user = userRepository.findByEmail(email);

            if (user == null) {
                logger.warn("User not found with email: {}", email);
                return new ResponseEntity<>(new AuthResponse("User not found with email: " + email, false), HttpStatus.NOT_FOUND);
            }

            logger.info("Found user: ID={}, Email={}", user.getId(), user.getEmail());

            // Return the user data
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error fetching user profile", e);
            return new ResponseEntity<>(new AuthResponse("Error fetching user profile: " + e.getMessage(), false),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}