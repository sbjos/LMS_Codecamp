package com.codecamp.controllers;

import com.codecamp.dto.AssignmentResponseDto;
import com.codecamp.entities.Assignment;
import com.codecamp.entities.User;
import com.codecamp.services.AssignmentService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class AssignmentController {

    private final Logger log = LogManager.getLogger(AssignmentController.class);

    @Autowired
    private AssignmentService assignmentService;

    @GetMapping(value = "/api/assignments")
    public ResponseEntity<List<AssignmentResponseDto>> getSubmittedAssignments(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(assignmentService.getSubmittedAssignments(user), HttpStatus.OK);
    }

    @GetMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> getAssignmentById(@PathVariable("id") Long assignmentId,
                                                                   @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(assignmentService.getAssignmentById(assignmentId, user), HttpStatus.OK);
    }

    @PutMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> updateAssignmentById(@PathVariable("id") Long assignmentId,
                                                                      @RequestBody Assignment update,
                                                                      @AuthenticationPrincipal User user) {
        AssignmentResponseDto assignmentDto;

        try {
            assignmentDto = assignmentService.updateAssignmentById(assignmentId, update, user);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(assignmentDto, HttpStatus.OK);
    }

    @PostMapping(value = "/api/assignments")
    public ResponseEntity<AssignmentResponseDto> createAssignment(@RequestBody Assignment assignment,
                                                                  @AuthenticationPrincipal User user) {
        try {
            assignmentService.createAssignment(assignment, user);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
