package com.codecamp.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.security.core.GrantedAuthority;
import jakarta.persistence.*;
import org.springframework.data.relational.core.mapping.Table;
import java.util.Objects;

@Entity
@Table(name = "authorities")
public class Authority implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String authority;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public Authority() {}

    public Authority(Long id, String authority) {
        this.id = id;
        this.authority = authority;
    }

    public Authority(String authority) {
        this.authority = authority;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public User getUser() {
        return user;
    }

    @Override
    public String toString() {
        return authority;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;
        Authority that = (Authority) o;
        return Objects.equals(this.id, that.id) &&
                Objects.equals(this.user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.user);
    }
}
