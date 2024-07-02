package com.codecamp.userservice.services;

import com.codecamp.userservice.config.TestDatabaseConfig;
import com.codecamp.userservice.entities.User;
import com.hcc.testhelper.TestUserHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.ContextConfiguration;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ContextConfiguration(classes = TestDatabaseConfig.class)
public class UserDetailServiceImplTest {

    // test users
    private final User user1 = TestUserHelper.user1();

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @BeforeEach
    void setup() {}

    @Test
    void loadUserByUsername_withValidUser_returnsUser() {
        // GIVEN
        String validUser = "user1";

        // WHEN
        UserDetails result = userDetailService.loadUserByUsername(validUser);

        // THEN
        assertEquals(user1.getUsername(), result.getUsername());
    }

    @Test
    void loadUserByUsername_invalidUser_throwsUsernameNotFoundException() {
        // GIVEN
        String invalidUser = "Does_Not_Exist";

        // WHEN - THEN
        assertThrows(UsernameNotFoundException.class, () ->
                userDetailService.loadUserByUsername(invalidUser),
                "Invalid Credentials");
    }
}
