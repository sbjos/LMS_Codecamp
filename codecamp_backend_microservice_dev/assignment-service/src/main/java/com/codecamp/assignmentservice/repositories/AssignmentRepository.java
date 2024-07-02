package com.codecamp.assignmentservice.repositories;

import com.codecamp.assignmentservice.entities.Assignment;
import com.codecamp.assignmentservice.dto.UserResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByUser(UserResponseDto user);
    Optional<Assignment> findByIdAndUser(Long id, UserResponseDto user);
    List<Assignment> findByCodeReviewer(UserResponseDto user);
    Optional<Assignment> findByIdAndCodeReviewer(Long id, UserResponseDto user);
}
