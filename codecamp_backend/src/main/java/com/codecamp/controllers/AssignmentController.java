package com.codecamp.controllers;

import com.codecamp.dto.AssignmentResponseDto;
import com.codecamp.entities.Assignment;
import com.codecamp.entities.User;
import com.codecamp.exceptions.AssignmentNotFoundException;
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
    public ResponseEntity<List<AssignmentResponseDto>> getUserAssignmentList(@AuthenticationPrincipal User user) {
        List<AssignmentResponseDto> assignmentResponse;

        try {
            assignmentResponse = assignmentService.getUserAssignmentList(user);

        } catch (AssignmentNotFoundException e) {
            log.warn(e, new AssignmentNotFoundException());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            log.warn(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(assignmentResponse, HttpStatus.OK);
    }

    @GetMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> getAssignment(@PathVariable("id") Long assignmentId) {
        AssignmentResponseDto assignmentResponse;

        try {
            assignmentResponse = assignmentService.getAssignmentById(assignmentId);

        } catch (AssignmentNotFoundException e) {
            log.warn(e, new AssignmentNotFoundException());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            log.warn(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(assignmentResponse, HttpStatus.OK);
    }

    @PutMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> updateAssignment(@PathVariable("id") Long assignmentId,
                                                                      @RequestBody Assignment update,
                                                                      @AuthenticationPrincipal User user) {
        AssignmentResponseDto assignment;

        try {
            assignment = assignmentService.updateAssignmentById(assignmentId, update, user);


        } catch (AssignmentNotFoundException e) {
            log.warn(e.getMessage(), new AssignmentNotFoundException());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        } catch (Exception e) {
            log.warn(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(assignment, HttpStatus.OK);
    }

    @PostMapping(value = "/api/assignments")
    public ResponseEntity<AssignmentResponseDto> createAssignment(@RequestBody Assignment assignment,
                                                                  @AuthenticationPrincipal User user) {
        try {
            assignmentService.createAssignment(assignment, user);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        } catch (Exception e) {
            log.warn(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
