package com.codecamp.testhelper;

import com.codecamp.entities.Assignment;
import com.codecamp.enums.AssignmentStatusEnum;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static com.codecamp.testhelper.TestUserHelper.*;

// Test helper class
@SpringBootTest
public class TestAssignmentHelper {

    public static Assignment assignment1() {
        return new Assignment(
                1L,
                11,
                "app one",
                "app description 1",
                AssignmentStatusEnum.SUBMITTED.getStatus(),
                "https://github.com/johndoe/project",
                "main",
                "",
                LocalDateTime.of(2023, 12, 30, 17, 52, 51),
                LocalDateTime.of(2024, 12, 20, 17, 52, 51),
                user1(),
                null
        );
    }

    public static Assignment assignment2() {
        return new Assignment(
                2L,
                22,
                "app two",
                "app description 2",
                AssignmentStatusEnum.COMPLETED.getStatus(),
                "https://github.com/janesmith/project",
                "dev",
                "https://vid.com/review2",
                LocalDateTime.of(2023, 12, 30, 17, 52, 51),
                LocalDateTime.of(2024, 1, 20, 17, 52, 51),
                user2(),
                reviewer1()
        );
    }

    public static Assignment assignment3() {
        return new Assignment(
                3L,
                33,
                "app three",
                "app description 3",
                AssignmentStatusEnum.NEEDS_WORK.getStatus(),
                "https://github.com/janesmith/project",
                "dev",
                "https://vid.com/review24",
                LocalDateTime.of(2023, 12, 30, 17, 52, 51),
                LocalDateTime.of(2024, 3, 20, 17, 52, 51),
                user2(),
                reviewer1()
        );
    }
}
