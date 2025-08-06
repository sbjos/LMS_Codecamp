package com.codecamp.services;

import com.codecamp.dto.AssignmentResponseDto;
import com.codecamp.entities.Assignment;
import com.codecamp.exceptions.AssignmentNotFoundException;
import com.codecamp.repositories.AssignmentRepository;
import com.codecamp.utils.ObjectMappingUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.codecamp.enums.AssignmentStatusEnum.*;
import static com.codecamp.testhelper.TestAssignmentHelper.*;
import static com.codecamp.testhelper.TestUserHelper.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class AssignmentServiceTest {

    @InjectMocks
    private AssignmentService assignmentService;

    @Mock
    private AssignmentRepository assignmentRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserAssignmentList_Returns_Assignments() {
        // GIVEN
        List<AssignmentResponseDto> assignmentList = List.of(
                ObjectMappingUtils.assignmentMapping(assignment2()),
                ObjectMappingUtils.assignmentMapping(assignment3())
        );
        when(assignmentRepository.findByUser(user2()))
                .thenReturn(List.of(assignment2(), assignment3()));

        // WHEN
        List<AssignmentResponseDto> result = assignmentService.getUserAssignmentList(user2());

        // THEN
        assertEquals(assignmentList.size(), result.size());
    }

    @Test
    void getUserAssignmentList_throws_AssignmentNotFoundException() {
        // GIVEN
        when(assignmentRepository.findByUser(user3())).thenReturn(List.of());

        // WHEN - THEN
        assertThrows(AssignmentNotFoundException.class, () ->
                        assignmentService.getUserAssignmentList(user2()),
                "Assignment list not found");
    }

    @Test
    void getUserAssignmentList_fromReviewer_Returns_Assignments() {
        // GIVEN
        List<AssignmentResponseDto> assignmentList = List.of(
                ObjectMappingUtils.assignmentMapping(assignment1()),
                ObjectMappingUtils.assignmentMapping(assignment2()),
                ObjectMappingUtils.assignmentMapping(assignment3())
        );
        when(assignmentRepository.findByStatus("Submitted")).thenReturn(List.of(assignment1()));
        when(assignmentRepository.findByCodeReviewer(assignment2().getCodeReviewer()))
                .thenReturn(List.of(assignment2(), assignment3()));

        // WHEN
        List<AssignmentResponseDto> result = assignmentService.getUserAssignmentList(reviewer1());

        // THEN
        assertEquals(assignmentList.size(), result.size());
    }

    @Test
    void getUserAssignmentList_fromReviewer_throws_AssignmentNotFoundException() {
        // GIVEN
        when(assignmentRepository.findByStatus("Submitted")).thenReturn(List.of());
        when(assignmentRepository.findByCodeReviewer(assignment2().getCodeReviewer())).thenReturn(List.of());

        // WHEN - THEN
        assertThrows(AssignmentNotFoundException.class, () ->
                        assignmentService.getUserAssignmentList(reviewer1()),
                "Assignment list not found");
    }

    @Test
    void getAssignmentById_Returns_Assignment() {
        // GIVEN
        AssignmentResponseDto assignment = ObjectMappingUtils.assignmentMapping(assignment1());
        when(assignmentRepository.findById(assignment1().getId())).thenReturn(Optional.of(assignment1()));

        // WHEN
        AssignmentResponseDto result = assignmentService.getAssignmentById(assignment1().getId());

        // THEN
        assertEquals(assignment.getId(), result.getId());
    }

    @Test
    void getAssignmentById_throws_AssignmentNotFoundException() {
        // GIVEN
        when(assignmentRepository.findById(assignment1().getId())).thenReturn(Optional.empty());

        // WHEN - THEN
        assertThrows(AssignmentNotFoundException.class, () ->
                        assignmentService.getAssignmentById(assignment1().getId()),
                "Assignment list not found");
    }

    @Test
    void getAssignmentById_fromCodeReviewer_Returns_Assignment() {
        // GIVEN
        AssignmentResponseDto assignment = ObjectMappingUtils.assignmentMapping(assignment1());
        when(assignmentRepository.findById(assignment1().getId())).thenReturn(Optional.of(assignment1()));

        // WHEN
        AssignmentResponseDto result = assignmentService.getAssignmentById(assignment1().getId());

        // THEN
        assertEquals(assignment.getId(), result.getId());
    }

    @Test
    void getAssignmentById_fromCodeReviewer_throws_AssignmentNotFoundException() {
        // GIVEN
        when(assignmentRepository.findById(assignment1().getId())).thenReturn(Optional.empty());

        // WHEN - THEN
        assertThrows(AssignmentNotFoundException.class, () ->
                        assignmentService.getAssignmentById(assignment1().getId()),
                "Assignment list not found");
    }

    @Test
    void updateAssignment_with_Submitted_status_returns_UpdatedAssignment() {
        // GIVEN
        AssignmentResponseDto updatedAssignment = ObjectMappingUtils.assignmentMapping(
                        new Assignment(
                                1L,
                                11,
                                "app one",
                                "app description 1",
                                SUBMITTED.getStatus(),
                                "https://github.com/johndoe/project/updated",
                                "main",
                                "",
                                LocalDateTime.of(2023, 12, 30, 17, 52, 51),
                                LocalDateTime.of(2023, 12, 20, 17, 52, 51),
                                user1(),
                                null
                        )
        );

        Assignment assignmentUpdate = new Assignment(
                1L,
                11,
                "app one",
                "app description 1",
                SUBMITTED.getStatus(),
                "https://github.com/johndoe/project/updated",
                "main",
                "",
                LocalDateTime.of(2023, 12, 30, 17, 52, 51),
                LocalDateTime.of(2023, 12, 20, 19, 52, 51),
                user1(),
                null
        );

        when(assignmentRepository.findById(assignment1().getId())).thenReturn(Optional.of(assignment1()));
        when(assignmentRepository.save(any())).thenReturn(null);

        // GIVEN
        AssignmentResponseDto result = assignmentService.updateAssignmentById(
                assignment1().getId(), assignmentUpdate, user1()
        );

        // THEN
        assertEquals(updatedAssignment.getStatus(), result.getStatus());
        assertEquals(updatedAssignment.getAssignmentUrl(), result.getAssignmentUrl());
    }

    @Test
    void updateAssignment_returns_with_NeedsWork_Status_UpdatedAssignment() {
        // GIVEN
        AssignmentResponseDto updatedAssignment = ObjectMappingUtils.assignmentMapping(
                new Assignment(
                        3L,
                        33,
                        "app three",
                        "app description 3",
                        IN_REVIEW.getStatus(),
                        "https://github.com/janesmith/project/updated",
                        "dev",
                        "https://vid.com/review24",
                        LocalDateTime.of(2023, 12, 30, 17, 52, 51),
                        LocalDateTime.of(2023, 12, 30, 17, 52, 51),
                        user2(),
                        reviewer1()
                )
        );

        Assignment assignmentUpdate = new Assignment(
                3L,
                33,
                "app three",
                "app description 3",
                NEEDS_WORK.getStatus(),
                "https://github.com/janesmith/project/updated",
                "dev",
                "https://vid.com/review24",
                LocalDateTime.of(2023, 12, 30, 17, 52, 51),
                LocalDateTime.of(2023, 12, 20, 17, 52, 21),
                user2(),
                reviewer1()
        );

        when(assignmentRepository.findById(assignment1().getId())).thenReturn(Optional.of(assignment3()));
        when(assignmentRepository.save(any())).thenReturn(null);

        // GIVEN
        AssignmentResponseDto result = assignmentService.updateAssignmentById(
                assignment1().getId(), assignmentUpdate, user1()
        );

        // THEN
        assertEquals(updatedAssignment.getStatus(), result.getStatus());
        assertEquals(updatedAssignment.getAssignmentUrl(), result.getAssignmentUrl());
    }

    @Test
    void updateAssignment_throws_AssignmentNotFoundException() {
        // GIVEN
        when(assignmentRepository.findById(assignment1().getId())).thenReturn(Optional.empty());

        // WHEN - THEN
        assertThrows(AssignmentNotFoundException.class, () ->
                        assignmentService.getAssignmentById(assignment1().getId()),
                "Assignment list not found");
    }

    @Test
    void updateAssignment_fromReviewer_returns_UpdatedAssignment() {
        // GIVEN
        AssignmentResponseDto updatedAssignment = ObjectMappingUtils.assignmentMapping(
                new Assignment(
                        1L,
                        11,
                        "app one",
                        "app description 1",
                        IN_REVIEW.getStatus(),
                        "https://github.com/johndoe/project",
                        "main",
                        "",
                        LocalDateTime.of(2023, 12, 30, 17, 52, 51),
                        LocalDateTime.of(2024, 12, 20, 17, 52, 51),
                        user1(),
                        reviewer1()
                )
        );

        Assignment assignmentUpdate = new Assignment(
                null,
                null,
                null,
                null,
                IN_REVIEW.getStatus(),
                "https://github.com/johndoe/project/updated",
                null,
                null,
                null,
                null,
                null,
                null
        );

        when(assignmentRepository.findById(assignment1().getId())).thenReturn(Optional.of(assignment1()));
        when(assignmentRepository.save(any())).thenReturn(null);

        // GIVEN
        AssignmentResponseDto result = assignmentService.updateAssignmentById(
                assignment1().getId(), assignmentUpdate, reviewer1()
        );

        // THEN
        assertEquals(updatedAssignment.getStatus(), result.getStatus());
        assertEquals(updatedAssignment.getAssignmentUrl(), result.getAssignmentUrl());
    }

    @Test
    void updateAssignment_fromReviewer_throws_AssignmentNotFoundException() {
        // GIVEN
        when(assignmentRepository.findById(assignment1().getId())).thenReturn(Optional.empty());

        // WHEN - THEN
        assertThrows(AssignmentNotFoundException.class, () ->
                        assignmentService.getAssignmentById(assignment1().getId()),
                "Assignment list not found");
    }
}
