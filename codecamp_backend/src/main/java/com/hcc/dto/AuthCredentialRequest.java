package com.hcc.dto;

import java.util.Objects;

public class AuthCredentialRequest {

    private String username;

    private String password;

    public AuthCredentialRequest() {}

    public AuthCredentialRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;
        AuthCredentialRequest that = (AuthCredentialRequest) o;
        return Objects.equals(this.username, that.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.username);
    }
}
