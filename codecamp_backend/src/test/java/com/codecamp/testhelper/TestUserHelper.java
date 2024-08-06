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
                "John",
                "Doe",
                "user1",
                "password",
                "12 Main st",
                "",
                "Riverdale",
                "MT",
                "58563",
                Set.of(learner())
        );
    }

    public static User user2() {
        return new User(
                LocalDate.of(2023, 7, 4),
                "Jane",
                "Doe",
                "user2",
                "password",
                "12 Main st",
                "",
                "Riverdale",
                "MT",
                "58563",
                Set.of(learner())
        );
    }

    public static User reviewer1() {
        return new User(
                null,
                "Jane",
                "Scott",
                "reviewer",
                "password",
                "12 Main st",
                "",
                "Riverdale",
                "MT",
                "58563",
                Set.of(reviewer())
        );
    }
}
