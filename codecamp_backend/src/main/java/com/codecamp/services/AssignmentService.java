package com.codecamp.services;

import com.codecamp.dto.AssignmentResponseDto;
import com.codecamp.entities.Assignment;
import com.codecamp.entities.User;
import com.codecamp.exceptions.AssignmentNotFoundException;
import com.codecamp.repositories.AssignmentRepository;
import com.codecamp.utils.ObjectMappingUtils;
import com.codecamp.utils.TimeZoneConverterUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.codecamp.enums.AssignmentStatusEnum.*;
import static com.codecamp.enums.AuthorityEnum.*;
import static com.codecamp.utils.ObjectMappingUtils.assignmentMapping;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    private final Logger log = LogManager.getLogger(AssignmentService.class);

    /**
     * For learners, this will pull all of their submitted assignments.
     * For reviewers, this will pull all submitted assignments and allow them to claim an assignment.
     * @param user user details
     * @return list of assignments
     * @throws AssignmentNotFoundException assignments not found
     */
    public List<AssignmentResponseDto> getUserAssignmentList(User user) {
        List<Assignment> assignmentsPage = new ArrayList<>();

        if (user.getAuthorities().toString().contains(LEARNER.name())) {
            assignmentsPage.addAll(assignmentRepository.findByUser(user));

        } else if (user.getAuthorities().toString().contains(REVIEWER.name())) {
            assignmentsPage.addAll(assignmentRepository.findByStatus(SUBMITTED.getStatus()));
            assignmentsPage.addAll(assignmentRepository.findByCodeReviewer(user));

        }

        if (assignmentsPage.isEmpty()) {
            log.warn(new AssignmentNotFoundException("Assignment list not found"));
            throw new AssignmentNotFoundException("Assignment list not found");
        }

        return assignmentsPage.stream()
                .map(ObjectMappingUtils::assignmentMapping)
                .collect(Collectors.toList());
    }

    /**
     * Gets an assignment by ID.
     * @param assignmentId assignment id
     * @return assignment
     * @throws AssignmentNotFoundException assignment not found
     */
    public AssignmentResponseDto getAssignmentById(Long assignmentId) {
        Assignment assignment = assignmentLookup(assignmentId);

        return assignmentMapping(assignment);
    }

    /**
     * Updates an existing assignment.
     * @param assignmentId assignment id.
     * @param update       updated assignment details
     * @param user         user details
     * @return an updated assignment
     * @throws AssignmentNotFoundException assignment not found
     */
    public AssignmentResponseDto updateAssignmentById(Long assignmentId, Assignment update, User user) {
        if (hasReachedLimit(assignmentId, update, user)) throw new IllegalArgumentException("Limit reached");

        try {
            Assignment userAssignment;
            GrantedAuthority userAuthority = user.getAuthorities().stream().findFirst().get();

            if (userAuthority.toString().equals(REVIEWER.name())) {
                userAssignment = assignmentLookup(assignmentId);

                Optional.of(user).ifPresent(userAssignment::setCodeReviewer);
                Optional.ofNullable(update.getReviewVideoUrl()).ifPresent(userAssignment::setReviewVideoUrl);
                userAssignment.setStatus(update.getStatus());

            } else {
                userAssignment = assignmentLookup(assignmentId);

                Optional.ofNullable(update.getAssignmentUrl()).ifPresent(userAssignment::setAssignmentUrl);
                Optional.ofNullable(update.getBranch()).ifPresent(userAssignment::setBranch);
                Optional.ofNullable(update.getCodeReviewer()).ifPresent(userAssignment::setCodeReviewer);
                userAssignment.setLastUpdated(TimeZoneConverterUtils.convertLocalTimeToUTC());

                if (userAssignment.getStatus().equals(NEEDS_WORK.getStatus())) {
                    userAssignment.setStatus(IN_REVIEW.getStatus());
                }
            }

            assignmentRepository.save(userAssignment);

            return assignmentMapping(userAssignment);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * Saves a new assignment.
     * @param newAssignment assignment details
     * @param user          user details
     */
    public void createAssignment(Assignment newAssignment, User user) {
        List<Assignment> submittedAssignments = assignmentRepository.findByStatusAndUser(SUBMITTED.getStatus(), user);
        int size = submittedAssignments.size();
        int random;
        boolean isDuplicate = false;

        if (size >= 10) {
            throw new IllegalArgumentException("To many unassigned assignments " + size);

        } else {
            do {
                random = new Random().nextInt(90959 - 10959 + 1) + 10959;
                Optional<Assignment> assignmentNumber = assignmentRepository.findByNumber(random);

                if (assignmentNumber.isPresent()) {
                    isDuplicate = true;
                }

            } while (isDuplicate);

            try {
                newAssignment.setNumber(random);
                newAssignment.setUser(user);
                newAssignment.setCreationTime(TimeZoneConverterUtils.convertLocalTimeToUTC());
                newAssignment.setStatus(SUBMITTED.getStatus());

                assignmentRepository.save(newAssignment);

            } catch (IllegalArgumentException e) {
                log.warn(e, new IllegalArgumentException());
                throw new IllegalArgumentException(e);
            }
        }
    }

    /**
     * Helper method that finds an assignment by id and user or by id and reviewer.
     * @param assignmentId assignment id
     * @return assignment
     * @throws AssignmentNotFoundException assignment not found
     */
    private Assignment assignmentLookup(Long assignmentId) {
        return assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new AssignmentNotFoundException(
                        String.format("Assignment %s not found", assignmentId))
                );
    }

    /**
     * Helper method that verifies if the limit is reached before submitting the request.
     * @param update assignment details
     * @param user user details
     * @return true if limit has reached, false if not.
     */
    private boolean hasReachedLimit(Long assignmentId, Assignment update, User user) {
        GrantedAuthority userAuthority = user.getAuthorities().stream().findFirst().get();
        String updateStatus = update.getStatus();
        Map<String, Integer> learnerAssignments = new HashMap<>();

        if (userAuthority.toString().equals(LEARNER.name())) {
            if (assignmentLookup(assignmentId).getStatus().equals(SUBMITTED.getStatus())) {
                return false;
            }

            assignmentRepository.findByUser(user).stream()
                    .map(Assignment::getStatus)
                    .forEach(status -> learnerAssignments.put(
                            status, learnerAssignments.getOrDefault(status, 0) + 1)
                    );

            if (learnerAssignments.containsKey(SUBMITTED.getStatus())) {
                return learnerAssignments.get(SUBMITTED.getStatus()) >= 10;
            }
        }

        if (userAuthority.toString().equals(REVIEWER.name())) {
            assignmentRepository.findByUser(update.getUser()).stream()
                    .map(Assignment::getStatus)
                    .forEach(status -> learnerAssignments.put(
                            status, learnerAssignments.getOrDefault(status, 0) + 1)
                    );

            List<Assignment> assignedToReviewer = assignmentRepository.findByCodeReviewer(user).stream()
                    .filter(assignments -> assignments.getStatus().equals(IN_REVIEW.getStatus()))
                    .toList();

            if (updateStatus.equals(IN_REVIEW.getStatus()) &&
                    assignedToReviewer.size() >= 10)
                return true;

            if (learnerAssignments.containsKey(IN_REVIEW.getStatus())) {
                if (updateStatus.equals(IN_REVIEW.getStatus()) &&
                        learnerAssignments.get(IN_REVIEW.getStatus()) >= 10) {
                    return true;
                }
            }

            if (learnerAssignments.containsKey(NEEDS_WORK.getStatus())) {
                return updateStatus.equals(NEEDS_WORK.getStatus()) &&
                        learnerAssignments.get(NEEDS_WORK.getStatus()) >= 10;
            }
        }

        return false;
    }
}
