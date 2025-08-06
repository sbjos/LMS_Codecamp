package com.codecamp.repositories;

import com.codecamp.entities.Assignment;
import com.codecamp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByUser(User user);
    Optional<Assignment> findByNumber(int number);
    List<Assignment> findByCodeReviewer(User user);
    List<Assignment> findByStatus(String status);
    List<Assignment> findByStatusAndUser(String status, User user);
}
