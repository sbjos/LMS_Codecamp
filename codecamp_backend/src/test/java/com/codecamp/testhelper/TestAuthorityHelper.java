package com.codecamp.testhelper;

import com.codecamp.entities.Authority;
import org.springframework.boot.test.context.SpringBootTest;

// Test helper class
@SpringBootTest
public class TestAuthorityHelper {

    public static Authority learner() {
        return new Authority("LEARNER");
    }

    public static Authority reviewer() {
        return new Authority("REVIEWER");
    }
}
