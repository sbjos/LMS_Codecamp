package com.codecamp.testhelper;

import com.codecamp.entities.Assignment;
import com.codecamp.enums.AssignmentStatusEnum;
import org.springframework.boot.test.context.SpringBootTest;

import static com.codecamp.testhelper.TestUserHelper.*;

// Test helper class
@SpringBootTest
public class TestAssignmentHelper {

    public static Assignment assignment1() {
        return new Assignment(
            11,
            AssignmentStatusEnum.SUBMITTED.getStatus(),
            "https://github.com/johndoe/project",
            "main",
            "",
            user1(),
            null
        );
    }

    public static Assignment assignment2() {
        return new Assignment(
                22,
                AssignmentStatusEnum.COMPLETED.getStatus(),
                "https://github.com/janesmith/project",
                "main",
                "https://vid.com/review2",
                user2(),
                reviewer1()
        );
    }

    public static Assignment assignment3() {
        return new Assignment(
                33,
                AssignmentStatusEnum.NEEDS_WORK.getStatus(),
                "https://github.com/janesmith/project",
                "main",
                "https://vid.com/review24",
                user2(),
                reviewer1()
        );
    }
}
