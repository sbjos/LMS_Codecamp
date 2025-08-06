package com.codecamp.dto;

import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

public class AssignmentUserResponseDto {
    private Long id;
    private LocalDateTime cohortStartDate;
    private String firstname;
    private String lastname;
    private String username;
    private Set<GrantedAuthority> authorities;

    public AssignmentUserResponseDto() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCohortStartDate() {
        return cohortStartDate;
    }

    public void setCohortStartDate(LocalDateTime cohortStartDate) {
        this.cohortStartDate = cohortStartDate;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String toString() {
        return "AssignmentUserResponseDto{" +
                "id=" + id +
                ", cohortStartDate=" + cohortStartDate +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", username='" + username + '\'' +
                ", authorities=" + authorities +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AssignmentUserResponseDto that = (AssignmentUserResponseDto) o;
        return Objects.equals(id, that.id) && Objects.equals(username, that.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username);
    }
}
