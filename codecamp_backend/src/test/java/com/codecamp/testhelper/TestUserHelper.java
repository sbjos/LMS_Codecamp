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
                1L,
                LocalDate.of(2023, 11, 20),
                "John",
                "Doe",
                "user1",
                "password",
                "123 Main st",
                "password",
                "Orlando",
                "FL",
                "32835",
                Set.of(learner()),
                true,
                true,
                true,
                true

        );
    }

    public static User user2() {
        return new User(
                2L,
                LocalDate.of(2023, 7, 4),
                "Jane",
                "Smith",
                "user2",
                "password",
                "456 Main st",
                "password",
                "Sanford",
                "FL",
                "32771",
                Set.of(learner()),
                true,
                true,
                true,
                true
        );
    }

    public static User user3() {
        return new User(
                3L,
                LocalDate.of(2024, 7, 14),
                "Jean Claude",
                "Vann Damme",
                "user3",
                "password",
                "789 Main st",
                "password",
                "Memphis",
                "TN",
                "32771",
                Set.of(learner()),
                true,
                true,
                true,
                true
        );
    }

    public static User reviewer1() {
        return new User(
                4L,
                null,
                "Jane",
                "Scott",
                "reviewer",
                "password",
                "147 Main st",
                "password",
                "Auburndale",
                "FL",
                "33823",
                Set.of(reviewer()),
                true,
                true,
                true,
                true
        );
    }
}
