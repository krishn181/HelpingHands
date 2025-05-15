package com.HelpingHands.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtConstant {
    // Static field
    public static String SECRET_KEY;

    public static final String JWT_HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";

    // Use setter method with @Value to properly inject into static field
    @Value("${jwt.secret.key}")
    public void setSecretKey(String secretKey) {
        JwtConstant.SECRET_KEY = secretKey;
    }
}
