package com.codecamp.services;

import com.codecamp.dto.AssignmentResponseDto;
import com.codecamp.entities.Assignment;
import com.codecamp.entities.User;
import com.codecamp.exceptions.AssignmentNotFoundException;
import com.codecamp.repositories.AssignmentRepository;
import com.codecamp.utils.ObjectMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import static com.codecamp.enums.AssignmentStatusEnum.*;
import static com.codecamp.enums.AuthorityEnum.*;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    /**
     * For learners, this will pull all of their submitted assignments.
     * For reviewers, this will pull all assignments and allow them to claim an assignment.
     *
     * @param user user details
     * @return list of assignments
     * @throws AssignmentNotFoundException assignments not found
     */
    public List<AssignmentResponseDto> getAssignments(User user) {
        List<Assignment> assignmentsPage = null;

        if (user.getAuthorities().toString().contains(LEARNER.name())) {
            assignmentsPage = assignmentRepository.findByUser(user);

        } else if (user.getAuthorities().toString().contains(REVIEWER.name())) {
            assignmentsPage = assignmentRepository.findAll();
        }

        if (assignmentsPage.isEmpty())
            throw new AssignmentNotFoundException("Assignment list not found");

        return assignmentsPage.stream()
                .map(assignment -> new ObjectMapping().assignmentMapping(assignment))
                .collect(Collectors.toList());
    }

    /**
     * Gets an assignment by ID.
     *
     * @param assignmentId assignment id
     * @param user user details
     * @return assignment
     * @throws AssignmentNotFoundException assignment not found
     */
    public AssignmentResponseDto getAssignmentById(Long assignmentId, User user) {
        return new ObjectMapping().assignmentMapping(assignmentLookup(assignmentId, user)
                .orElseThrow(
                        () -> new AssignmentNotFoundException(String.format("Assignment %s not found.", assignmentId)))
        );
    }

    /**
     * Modifies an existing assignment.
     *
     * @param assignmentId assignment id.
     * @param update assignment details
     * @param user user details
     * @return HTTPStatus response with modified assignment
     * @throws AssignmentNotFoundException assignment not found
     */
    public AssignmentResponseDto updateAssignmentById(Long assignmentId, Assignment update, User user) {
        if (hasReachedLimit(assignmentId, update, user)) throw new IllegalArgumentException("Limit reached");

        Optional<Assignment> userAssignment;
        GrantedAuthority userAuthority = user.getAuthorities().stream().findFirst().get();

        if (userAuthority.toString().equals(REVIEWER.name())) {
            userAssignment = assignmentLookup(assignmentId, update.getUser());

            Optional.of(user).ifPresent(codeReviewer -> userAssignment.get().setCodeReviewer(codeReviewer));
            userAssignment.get().setStatus(update.getStatus());
            Optional.ofNullable(update.getReviewVideoUrl()).ifPresent(videoUrl -> userAssignment.get()
                    .setReviewVideoUrl(videoUrl));

        } else {
            userAssignment = assignmentLookup(assignmentId, user);

            Optional.ofNullable(update.getGithubUrl()).ifPresent(url -> userAssignment.get().setGithubUrl(url));
            Optional.ofNullable(update.getBranch()).ifPresent(branch -> userAssignment.get().setBranch(branch));
            Optional.ofNullable(update.getCodeReviewer())
                    .ifPresent(codeReviewer -> userAssignment.get().setCodeReviewer(codeReviewer)
            );
            userAssignment.get().setStatus(SUBMITTED.getStatus());

        }

        assignmentRepository.save(userAssignment.get());

        return new ObjectMapping().assignmentMapping(userAssignment.orElseThrow(
                () -> new AssignmentNotFoundException(String.format("Assignment %s not found.", assignmentId)))
        );
    }

    /**
     * Saves a new assignment.
     *
     * @param assignment assignment details
     * @param user user details
     */
    public void createAssignment(@RequestBody Assignment assignment,
                                                  @AuthenticationPrincipal User user) {
        int size;
        int random;
        boolean isDuplicate;
        List<Assignment> existingAssignment = assignmentRepository.findByUser(user);

        List<Assignment> submittedAssignments = existingAssignment.stream()
                .filter(assignments -> assignments.getStatus().contains(SUBMITTED.getStatus()))
                .toList();

        size = submittedAssignments.size();

        if (size >= 10) {
            throw new IllegalArgumentException("To many unassigned assignments " + size);

        } else {
            do {
                random = new Random().nextInt(90959 - 10959 + 1) + 10959;
                isDuplicate = false;

                for (Assignment assignments : existingAssignment) {
                    if (assignments.getId() == random) {
                        isDuplicate = true;
                        break;
                    }
                }
            } while (isDuplicate);

            assignment.setNumber(random);
            assignment.setUser(user);
            assignment.setStatus(SUBMITTED.getStatus());

            assignmentRepository.save(assignment);
        }
    }

    /**
     * Helper method that finds an assignment by id and user or by id and reviewer.
     *
     * @param assignmentId assignment id
     * @param user user details
     * @return assignment
     * @throws AssignmentNotFoundException assignment not found
     */
    private Optional<Assignment> assignmentLookup(Long assignmentId, User user) {
        GrantedAuthority userAuthority = user.getAuthorities().stream().findFirst().get();

        if (userAuthority.toString().equals(REVIEWER.name())) {
            return Optional.ofNullable(assignmentRepository.findByIdAndCodeReviewer(assignmentId, user)
                    .orElseThrow(() -> new AssignmentNotFoundException("Assignment not found"))
            );

        } else {
            return Optional.ofNullable(assignmentRepository.findByIdAndUser(assignmentId, user)
                    .orElseThrow(() -> new AssignmentNotFoundException("Assignment not found"))
            );
        }
    }

    /**
     * Verifies if the limit is reached before submitting the request.
     *
     * @param update assignment details
     * @param user user details
     * @return true if limit has reached, false if not.
     */
    private boolean hasReachedLimit(Long assignmentId, Assignment update, User user) {
        GrantedAuthority userAuthority = user.getAuthorities().stream().findFirst().get();
        String updateStatus = update.getStatus();
        Map<String, Integer> learnerAssignments = new HashMap<>();

        if (userAuthority.toString().equals(LEARNER.name())) {
            if (assignmentLookup(assignmentId, user).get().getStatus().equals(SUBMITTED.getStatus())) {
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
