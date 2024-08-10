package com.codecamp.services;

import com.codecamp.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static com.codecamp.testhelper.TestUserHelper.user1;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class UserDetailServiceImplTest {

    @InjectMocks
    private UserDetailServiceImpl userDetailService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void loadUserByUsername_withValidUser_returnsUser() {
        // GIVEN
        when(userRepository.findByUsername(user1().getUsername())).thenReturn(Optional.of(user1()));

        // WHEN
        UserDetails result = userDetailService.loadUserByUsername(user1().getUsername());

        // THEN
        assertEquals(user1().getUsername(), result.getUsername());
    }

    @Test
    void loadUserByUsername_invalidUser_throwsUsernameNotFoundException() {
        // GIVEN
        String invalidUser = "Does_Not_Exist";

        // WHEN - THEN
        assertThrows(UsernameNotFoundException.class, () ->
                userDetailService.loadUserByUsername(invalidUser),
                String.format("user %s not found.", user1().getUsername())
        );
    }
}
