//package com.codecamp.dto;
//
//import com.codecamp.entities.Assignment;
//import com.codecamp.enums.AssignmentEnum;
//import com.codecamp.enums.AssignmentStatusEnum;
//
//public class AssignmentResponseDto {
//
//    private Assignment assignment;
//
//    private final AssignmentEnum[] AssignmentEnum = com.codecamp.enums.AssignmentEnum.values();
//
//    private final AssignmentStatusEnum[] assignmentStatusEnum = AssignmentStatusEnum.values();
//
//    public AssignmentResponseDto() {}
//
//    public AssignmentResponseDto(Assignment assignment) {
//        this.assignment = assignment;
//    }
//
//    public Assignment getAssignment() {
//        return assignment;
//    }
//
//    public void setAssignment(Assignment assignment) {
//        this.assignment = assignment;
//    }
//
//    public com.codecamp.enums.AssignmentEnum[] getAssignmentEnum() {
//        return AssignmentEnum;
//    }
//
//    public AssignmentStatusEnum[] getAssignmentStatusEnum() {
//        return assignmentStatusEnum;
//    }
//}