package com.HelpingHands.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

public class JwtValidator extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtValidator.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        if (jwt != null && jwt.startsWith(JwtConstant.TOKEN_PREFIX)) {
            jwt = jwt.substring(7); // Remove "Bearer " part

            try {
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                // Safely extract claims
                String email = claims.get("email", String.class);  // Use type-safe retrieval
                if (email == null) {
                    throw new BadCredentialsException("JWT does not contain valid 'email' claim");
                }

                // Extract authorities or set default
                String authorities = claims.get("authorities", String.class);
                if (authorities == null) {
                    authorities = "ROLE_USER";  // Default role if not provided
                }

                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                logger.debug("Successfully authenticated user: {}", email);

            } catch (Exception e) {
                logger.error("JWT validation failed: {}", e.getMessage());
                throw new BadCredentialsException("Invalid token...from JWT validation", e);
            }
        }

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }
}