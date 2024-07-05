package com.codecamp.dto;

import lombok.*;
import org.checkerframework.checker.units.qual.A;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDate;
import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {
    private Long id;

    private LocalDate cohortStartDate;

    private String firstName;

    private String lastName;

    private String username; // Holds the email address

    @Getter(AccessLevel.NONE)
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    //    public UserResponseDto(Builder builder) {
//        this.id = builder.id;
//        this.cohortStartDate = builder.cohortStartDate;
//        this.firstName = builder.firstName;
//        this.lastName = builder.lastName;
//        this.username = builder.username;
//        this.password = builder.password;
//        this.authorities = builder.authorities;
//    }
//
//    public static Builder builder() {
//        return new Builder();
//    }
//
//    public static class Builder {
//        private Long id;
//
//        private LocalDate cohortStartDate;
//
//        private String firstName;
//
//        private String lastName;
//
//        private String username; // Holds the email address
//
//        private String password;
//
//        private Collection<? extends GrantedAuthority> authorities;
//
//        public Builder id(Long id) {
//            this.id = id;
//            return this;
//        }
//
//        public Builder cohortStartDate(LocalDate cohortStartDate) {
//            this.cohortStartDate = cohortStartDate;
//            return this;
//        }
//
//        public Builder firstName(String firstName) {
//            this.firstName = firstName;
//            return this;
//        }
//
//        public Builder lastName(String lastName) {
//            this.lastName = lastName;
//            return this;
//        }
//
//        public Builder username(String username) {
//            this.username = username;
//            return this;
//        }
//
//        public Builder password(String password) {
//            this.password = password;
//            return this;
//        }
//
//        public Builder authorities(Collection<? extends GrantedAuthority> authorities) {
//            this.authorities = authorities;
//            return this;
//        }
//
//        public UserResponseDto build() {
//            return new UserResponseDto(this);
//        }
//    }
}