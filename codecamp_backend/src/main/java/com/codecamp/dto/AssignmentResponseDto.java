package com.codecamp.dto;

import com.codecamp.enums.AssignmentEnum;
import com.codecamp.enums.AssignmentStatusEnum;

import java.util.Arrays;
import java.util.Objects;

public class AssignmentResponseDto {
    private Long id;
    private int number;
    private String name;
    private String description;
    private String status;
    private String assignmentUrl;
    private String branch;
    private String reviewVideoUrl;
    private AssignmentUserResponseDto user;
    private AssignmentUserResponseDto codeReviewer;

    private final com.codecamp.enums.AssignmentEnum[] AssignmentEnum = com.codecamp.enums.AssignmentEnum.values();

    private final AssignmentStatusEnum[] assignmentStatusEnum = AssignmentStatusEnum.values();

    public AssignmentResponseDto() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
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

    public AssignmentUserResponseDto getUser() {
        return user;
    }

    public void setUser(AssignmentUserResponseDto user) {
        this.user = user;
    }

    public AssignmentUserResponseDto getCodeReviewer() {
        return codeReviewer;
    }

    public void setCodeReviewer(AssignmentUserResponseDto codeReviewer) {
        this.codeReviewer = codeReviewer;
    }

    public AssignmentEnum[] getAssignmentEnum() {
        return AssignmentEnum;
    }

    public AssignmentStatusEnum[] getAssignmentStatusEnum() {
        return assignmentStatusEnum;
    }

    @Override
    public String toString() {
        return "AssignmentResponseDto{" +
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
                ", AssignmentEnum=" + Arrays.toString(AssignmentEnum) +
                ", assignmentStatusEnum=" + Arrays.toString(assignmentStatusEnum) +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AssignmentResponseDto that = (AssignmentResponseDto) o;
        return Objects.equals(id, that.id) &&  number == that.number;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, number);
    }
}