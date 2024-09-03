package com.codecamp.controllers;

import com.codecamp.dto.AssignmentResponseDto;
import com.codecamp.entities.Assignment;
import com.codecamp.entities.User;
import com.codecamp.services.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @GetMapping(value = "/api/assignments")
    public ResponseEntity<List<AssignmentResponseDto>> getUserAssignmentList(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(assignmentService.getUserAssignmentList(user), HttpStatus.OK);
    }

    @GetMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> getAssignment(@PathVariable("id") Long assignmentId) {
                return new ResponseEntity<>(assignmentService.getAssignmentById(assignmentId), HttpStatus.OK);
    }

    @PutMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> updateAssignment(@PathVariable("id") Long assignmentId,
                                                                      @RequestBody Assignment update,
                                                                      @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(assignmentService.
                updateAssignmentById(assignmentId, update, user), HttpStatus.OK);
    }

    @PostMapping(value = "/api/assignments")
    public ResponseEntity<AssignmentResponseDto> createAssignment(@RequestBody Assignment assignment,
                                                                  @AuthenticationPrincipal User user) {
        assignmentService.createAssignment(assignment, user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
