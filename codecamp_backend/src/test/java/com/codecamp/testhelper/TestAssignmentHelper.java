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
            "videoNull",
            "This app allows to modify a video content.",
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
                "Chess Helper",
                "This app allows a user to view all possibilities of a chess game.",
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
                "grammar me",
                "This app verifies the grammar of a text.",
                AssignmentStatusEnum.NEEDS_WORK.getStatus(),
                "https://github.com/janesmith/project",
                "main",
                "https://vid.com/review24",
                user2(),
                reviewer1()
        );
    }
}
