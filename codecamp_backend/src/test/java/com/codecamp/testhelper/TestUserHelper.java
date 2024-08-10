package com.codecamp.testhelper;

import com.codecamp.entities.User;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Set;

import static com.codecamp.testhelper.TestAddressHelper.*;
import static com.codecamp.testhelper.TestAuthorityHelper.*;
import static com.codecamp.testhelper.TestAuthorityHelper.learner;
import static com.codecamp.testhelper.TestContactHelper.*;

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
                Set.of(learner()),
                contactUser1(),
                addressUser1(),
                true,
                true,
                true,
                true

        );
    }

    public static User user2() {
        return new User(
                LocalDate.of(2023, 7, 4),
                "Jane",
                "Smith",
                "user2",
                "password",
                Set.of(learner()),
                contactUser2(),
                addressUser2(),
                true,
                true,
                true,
                true
        );
    }

    public static User user3() {
        return new User(
                LocalDate.of(2024, 7, 14),
                "Jean Claude",
                "Vann Damme",
                "user3",
                "password",
                Set.of(learner()),
                contactUser3(),
                addressUser3(),
                true,
                true,
                true,
                true
        );
    }

    public static User reviewer1() {
        return new User(
                null,
                "Jane",
                "Scott",
                "reviewer",
                "password",
                Set.of(reviewer()),
                contactReviewer1(),
                addressReviewer1(),
                true,
                true,
                true,
                true
        );
    }
}
