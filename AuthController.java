//package com.HelpingHands.controller;
//
//import com.HelpingHands.Repository.UserRepository;
//import com.HelpingHands.config.JwtProvider;
//import com.HelpingHands.exception.UserException;
//import com.HelpingHands.model.Cart;
//import com.HelpingHands.model.User;
//import com.HelpingHands.request.LoginRequest;
//import  com.HelpingHands.response.AuthResponse;
//import com.HelpingHands.service.CartService;
//import com.HelpingHands.service.CustomUserServiceImplementation;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    private UserRepository userRepository;
//    private JwtProvider jwtProvider;
//    private PasswordEncoder passwordEncoder;
//    private CustomUserServiceImplementation customUserService;
//    private CartService cartService;
//
//    public AuthController (UserRepository userRepository,
//                           CustomUserServiceImplementation customUserService,
//                           PasswordEncoder passwordEncoder,
//                           JwtProvider jwtProvider,
//                           CartService cartService)
//    {
//        this.userRepository = userRepository;
//        this.customUserService = customUserService;
//        this.passwordEncoder = passwordEncoder;
//        this.jwtProvider = jwtProvider;
//        this.cartService = cartService;
//
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException{
//
//        String email = user.getEmail();
//        String password = user.getPassword();
//        String firstName = user.getFirstName();
//        String lastName = user.getLastName();
//
//        User isEmailExist = userRepository.findByEmail(email);
//
//
//        if(isEmailExist != null)
//        {throw new UserException("Email is already used in another account ");
//
//        }
//
//        User createdUser = new User();
//        createdUser.setEmail(email);
//        createdUser.setPassword(passwordEncoder.encode(password));
//        createdUser.setFirstName(firstName);
//        createdUser.setLastName(lastName);
//
//        User savedUser = userRepository.save(createdUser);
//
//        Cart cart = cartService.createCart(savedUser);
//
//        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String token = jwtProvider.generateToken(authentication);
//
//        AuthResponse authResponse= new AuthResponse(token,"SignUp Success");
//
//        return  new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
//
//
//    }
//
//
//    @PostMapping("/signin")
//    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest){
//        String userName = loginRequest.getEmail();
//        String password = loginRequest.getPassword();
//
//        Authentication authentication = authenticate(userName,password);
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String token = jwtProvider.generateToken(authentication);
//
//        AuthResponse authResponse= new AuthResponse(token,"SignIn Success");
//
//        return  new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
//
//    }
//
//
//    private Authentication authenticate(String userName, String password) {
//
//        UserDetails userDetails = customUserService.loadUserByUsername(userName);
//
//        if(userDetails == null){
//            throw  new BadCredentialsException("Invalid User Name.... ");
//        }
//        if(!passwordEncoder.matches(password,userDetails.getPassword()))
//        {
//            throw  new BadCredentialsException("Invalid Password...");
//        }
//
//
//        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
//    }
//
//
//}package com.HelpingHands.controller;

 package com.HelpingHands.controller;

import com.HelpingHands.Repository.UserRepository;
import com.HelpingHands.config.JwtProvider;
import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.Cart;
import com.HelpingHands.model.User;
import com.HelpingHands.request.LoginRequest;
import com.HelpingHands.response.AuthResponse;
import com.HelpingHands.service.CartService;
import com.HelpingHands.service.CustomUserServiceImplementation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserServiceImplementation customUserService;
    private final CartService cartService;

    public AuthController(UserRepository userRepository,
                          CustomUserServiceImplementation customUserService,
                          PasswordEncoder passwordEncoder,
                          JwtProvider jwtProvider,
                          CartService cartService) {
        this.userRepository = userRepository;
        this.customUserService = customUserService;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.cartService = cartService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        try {
            logger.info("Processing signup request for email: {}", user.getEmail());

            String email = user.getEmail();
            String password = user.getPassword();
            String firstName = user.getFirstName();
            Long mobile = user.getMobile();
            String lastName = user.getLastName();
            String role = user.getRole();

            logger.info("Mobile: {}", mobile);
            logger.info("Role: {}", role);


            // Check if the email already exists
            User existingUser = userRepository.findByEmail(email);
            if (existingUser != null) {
                logger.warn("Attempt to register with existing email: {}", email);
                throw new UserException("Email is already used in another account.");
            }

            // Create and save the new user
            User createdUser = new User();
            createdUser.setEmail(email);
            createdUser.setPassword(passwordEncoder.encode(password)); // Encode the password
            createdUser.setFirstName(firstName);
            createdUser.setMobile(mobile);
            createdUser.setLastName(lastName);
            createdUser.setRole("User");

            // Set default role if your User model has a role field
            // createdUser.setRole("ROLE_CUSTOMER");

            User savedUser = userRepository.save(createdUser);
            logger.info("User created successfully with ID: {}", savedUser.getId());

            // Create a cart for the new user
            Cart cart = cartService.createCart(savedUser);
            logger.info("Cart created for user: {}", savedUser.getId());

            // Create authentication token with authorities
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_CUSTOMER")); // Default role

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(), null, authorities);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate the JWT token
            String token = jwtProvider.generateToken(authentication);
            logger.info("JWT token generated for user: {}", savedUser.getEmail());

            AuthResponse authResponse = new AuthResponse(token, "SignUp Success");
            return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

        } catch (UserException e) {
            logger.error("User registration failed: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error during user registration", e);
            throw new UserException("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
        try {
            logger.info("Processing signin request for email: {}", loginRequest.getEmail());

            String userName = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            // Authenticate the user
            Authentication authentication = authenticate(userName, password);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate the JWT token
            String token = jwtProvider.generateToken(authentication);
            logger.info("User signed in successfully: {}", userName);

            AuthResponse authResponse = new AuthResponse(token, "SignIn Success");
            return new ResponseEntity<>(authResponse, HttpStatus.OK);

        } catch (BadCredentialsException e) {
            logger.error("Login failed - Bad credentials: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error during login", e);
            throw new BadCredentialsException("Authentication failed: " + e.getMessage());
        }
    }

    private Authentication authenticate(String userName, String password) {
        UserDetails userDetails = customUserService.loadUserByUsername(userName);

        if (userDetails == null) {
            logger.warn("Authentication failed: User not found - {}", userName);
            throw new BadCredentialsException("Invalid User Name.");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            logger.warn("Authentication failed: Invalid password for user - {}", userName);
            throw new BadCredentialsException("Invalid Password.");
        }

        // Return an authenticated token
        return new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities());
    }
}