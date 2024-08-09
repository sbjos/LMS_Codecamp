package com.codecamp.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Objects;

import static com.codecamp.utils.PatternValidation.emailPattern;
import static com.codecamp.utils.PatternValidation.phonePattern;

@Entity
@Table(name = "contact")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String phone;

    @Column
    private String email;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public Contact() {}

    public Contact(Long id, String phone, String email) {
        this.id = id;
        this.phone = phone;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phonePattern(phone);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = emailPattern(email);
    }

    public User getUser() {
        return user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;
        Contact that = (Contact) o;
        return Objects.equals(this.id, that.id) &&
                Objects.equals(this.user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.user);
    }
}
