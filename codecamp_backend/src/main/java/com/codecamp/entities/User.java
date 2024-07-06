package com.codecamp.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.codecamp.config.CustomPasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cohort_start_date")
    private LocalDate cohortStartDate;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname;

//    @Column(name = "user_name")
    @Column(name = "user_name")
    private String username; // user's email address

    @Column
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
     private Set<Authority> authorities;

    public User() {}

    public User(LocalDate cohortStartDate, String firstname, String lastname,
                String username, String password, Set<Authority> authorities) {
        this.cohortStartDate = cohortStartDate;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    // To encode a password for a created user
    public void setEncodedPassword(String password) {
        this.password = new CustomPasswordEncoder().getPasswordEncoder().encode(password);
    }

    public Long getId() {
        return id;
    }

    public LocalDate getCohortStartDate() {
        return cohortStartDate;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;
        User that = (User) o;
        return Objects.equals(this.id, that.id) &&
         Objects.equals(this.username, that.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.username);
    }
}
