package com.hcc.repositories;

import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByUser(User user);
    Optional<Assignment> findByIdAndUser(Long id, User user);
    List<Assignment> findByCodeReviewer(User user);
    Optional<Assignment> findByIdAndCodeReviewer(Long id, User user);
}
