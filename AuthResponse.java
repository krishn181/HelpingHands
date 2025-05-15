package com.HelpingHands.response;

public class AuthResponse {
    private String message;
    private String jwt;
    private boolean success;

    public AuthResponse() {
    }

    public AuthResponse(String message) {
        this.message = message;
        this.success = false;  // If there's only a message, success is false by default
    }

    public AuthResponse(String jwt, String message) {
        this.jwt = jwt;
        this.message = message;
        this.success = jwt != null && !jwt.isEmpty();  // Determine success based on JWT presence
    }

    public AuthResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
