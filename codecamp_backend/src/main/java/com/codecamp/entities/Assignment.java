package com.codecamp.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "assignment")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer number;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private String status;

//    @Column(name = "github_url")
    @Column(name = "assignment_url")
    private String assignmentUrl;

    @Column
    private String branch;

    @Column(name = "code_review_video_url")
    private String reviewVideoUrl;

    @Column(name = "creation_time")
    private LocalDateTime creationTime;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "code_reviewer_id")
    private User codeReviewer;

    public Assignment() {}


    public Assignment(Long id, Integer number, String name, String description, String status, String assignmentUrl, String branch,
                      String reviewVideoUrl, LocalDateTime creationTime, LocalDateTime lastUpdated, User user, User codeReviewer) {
        this.id = id;
        this.number = number;
        this.name = name;
        this.description = description;
        this.status = status;
        this.assignmentUrl = assignmentUrl;
        this.branch = branch;
        this.reviewVideoUrl = reviewVideoUrl;
        this.creationTime = creationTime;
        this.lastUpdated = lastUpdated;
        this.user = user;
        this.codeReviewer = codeReviewer;
    }

    public Long getId() {
        return id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAssignmentUrl() {
        return assignmentUrl;
    }

    public void setAssignmentUrl(String assignmentUrl) {
        this.assignmentUrl = assignmentUrl;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getReviewVideoUrl() {
        return reviewVideoUrl;
    }

    public void setReviewVideoUrl(String reviewVideoUrl) {
        this.reviewVideoUrl = reviewVideoUrl;
    }

    public LocalDateTime getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(LocalDateTime creationTime) {
        this.creationTime = creationTime;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getCodeReviewer() {
        return codeReviewer;
    }

    public void setCodeReviewer(User codeReviewer) {
        this.codeReviewer = codeReviewer;
    }

    @Override
    public String toString() {
        return "Assignment{" +
                "id=" + id +
                ", number=" + number +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", assignmentUrl='" + assignmentUrl + '\'' +
                ", branch='" + branch + '\'' +
                ", reviewVideoUrl='" + reviewVideoUrl + '\'' +
                ", user=" + user +
                ", codeReviewer=" + codeReviewer +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;
        Assignment that = (Assignment) o;
        return Objects.equals(this.id, that.id) && Objects.equals(this.user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user);
    }
}
