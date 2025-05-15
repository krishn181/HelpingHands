//package com.HelpingHands.config;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.SecretKey;
//import java.util.Date;
//
//@Service
//public class JwtProvider {
//
//    // Injecting the secret key dynamically from application properties
//    @Value("${jwt.secret.key}")
//    private String secretKey;
//
//    private static final long EXPIRATION_TIME = 3600000; // 1 hour in milliseconds
//
//    // Initialize the SecretKey dynamically based on the injected value
//    private SecretKey getSecretKey() {
//        return Keys.hmacShaKeyFor(secretKey.getBytes());
//    }
//
//    public String generateToken(Authentication auth) {
//        // Generate token with the secret key
//        return Jwts.builder()
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                .claim("email", auth.getName()) // Using auth.getName() to get the email
//                .signWith(getSecretKey())
//                .compact();
//    }
//
//    public String getEmailFromToken(String jwt) {
//        if (jwt.startsWith("Bearer ")) {
//            jwt = jwt.substring(7); // Remove "Bearer " prefix
//        }
//
//        try {
//            Claims claims = Jwts.parserBuilder()
//                    .setSigningKey(getSecretKey()) // Dynamically use the secret key
//                    .build()
//                    .parseClaimsJws(jwt)
//                    .getBody();
//
//            return claims.get("email", String.class); // Safely retrieve the email claim
//        } catch (Exception e) {
//            // Token is invalid or expired, can be logged or rethrown as custom exception
//            return null; // Or throw a specific exception, such as InvalidTokenException
//        }
//    }
//}

package com.HelpingHands.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class JwtProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.expiration:3600000}")  // Default to 1 hour if not specified
    private long expirationTime;

    @Value("${jwt.refresh.expiration:604800000}")  // Default to 7 days if not specified
    private long refreshExpirationTime;

    // Initialize the SecretKey dynamically based on the injected value
    private SecretKey getSecretKey() {
        // Using StandardCharsets.UTF_8 for better encoding control
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }


    public String generateToken(Authentication auth) {
        // Get user authorities/roles as a comma-separated string
        String authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(auth.getName())  // Primary subject identifier
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .claim("email", auth.getName())  // Email as a claim
                .claim("authorities", authorities)  // Add roles/authorities
                .signWith(getSecretKey())
                .compact();
    }


    public String generateRefreshToken(Authentication auth) {
        return Jwts.builder()
                .setSubject(auth.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTime))
                .claim("tokenType", "refresh")
                .signWith(getSecretKey())
                .compact();
    }


    public String getEmailFromToken(String jwt) {
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7); // Remove "Bearer " prefix
        }

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            return claims.get("email", String.class);
        } catch (ExpiredJwtException e) {
            logger.warn("Token expired: {}", e.getMessage());
            return null;
        } catch (UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e) {
            logger.error("Invalid token: {}", e.getMessage());
            return null;
        }
    }


    public boolean validateToken(String jwt) {
        try {
            if (jwt != null && jwt.startsWith("Bearer ")) {
                jwt = jwt.substring(7);
            }

            Jwts.parserBuilder()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(jwt);

            return true;
        } catch (ExpiredJwtException e) {
            logger.warn("Expired JWT token: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Malformed JWT token: {}", e.getMessage());
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("Invalid JWT token arguments: {}", e.getMessage());
        }

        return false;
    }


    public Claims getAllClaimsFromToken(String token) {
        try {
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            return Jwts.parserBuilder()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            logger.error("Could not extract claims from token: {}", e.getMessage());
            return null;
        }
    }


    public boolean isTokenExpired(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            Date expiration = claims.getExpiration();
            return expiration.before(new Date());
        } catch (Exception e) {
            return true; // Consider invalid tokens as expired
        }
    }
}