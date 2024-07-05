package com.codecamp.testhelper;

import com.codecamp.entities.User;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Set;

import static com.codecamp.testhelper.TestAuthorityHelper.*;
import static com.codecamp.testhelper.TestAuthorityHelper.learner;

// Test helper class
@SpringBootTest
public final class TestUserHelper {

    public static User user1() {
        return new User(
                LocalDate.of(2023, 11, 20),
                "fn",
                "ln",
                "user1",
                "password",
                Set.of(learner())
        );
    }

    public static User user2() {
        return new User(
                LocalDate.of(2023, 7, 4),
                "fn",
                "ln",
                "user2",
                "password",
                Set.of(learner())
        );
    }

    public static User reviewer1() {
        return new User(
                null,
                "fn",
                "ln",
                "reviewer",
                "password",
                Set.of(reviewer())
        );
    }
}
