package com.hcc.testhelper;

import com.hcc.entities.Assignment;
import com.hcc.enums.AssignmentStatusEnum;
import org.springframework.boot.test.context.SpringBootTest;

import static com.hcc.testhelper.TestUserHelper.*;

// Test helper class
@SpringBootTest
public class TestAssignmentHelper {

    public static Assignment assignment1() {
        return new Assignment(
            11,
            AssignmentStatusEnum.COMPLETED.getStatus(),
            "https://GithubUrl.com",
            "https://GithubUrl.com/branch",
            "https://VideoUrl.com/",
            user1(),
            reviewer1()
        );
    }

    public static Assignment assignment2() {
        return new Assignment(
            22,
            AssignmentStatusEnum.SUBMITTED.getStatus(),
            "https://GithubUrl.com",
            "https://GithubUrl.com/branch",
            "https://VideoUrl.com/",
            user1(),
            reviewer1()
        );
    }

    public static Assignment assignment3() {
        return new Assignment(
                33,
                AssignmentStatusEnum.NEEDS_WORK.getStatus(),
                "https://GithubUrl.com",
                "https://GithubUrl.com/branch",
                "https://VideoUrl.com/",
                user2(),
                reviewer1()
        );
    }
}
