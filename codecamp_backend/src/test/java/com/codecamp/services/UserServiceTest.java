package com.codecamp.services;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.User;
import com.codecamp.exceptions.UserNotFoundException;
import com.codecamp.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import static com.codecamp.testhelper.TestAuthorityHelper.learner;
import static com.codecamp.testhelper.TestUserHelper.*;
import static com.codecamp.utils.ObjectMapping.userResponseMapping;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@Service
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserById_returns_user() {
        // GIVEN
        UserResponseDto user = userResponseMapping(user1());
        when(userRepository.findById(user1().getId())).thenReturn(Optional.of(user1()));

        // WHEN
        UserResponseDto result = userService.getUserById(user1().getId());

        // THEN
        assertEquals(user.getUser().getUsername(), result.getUser().getUsername());
    }

    @Test
    void getUserById_throws_UserNotFoundException() {
        // GIVEN
        Long userId = 0L;
        when(userRepository.findById(0L)).thenReturn(Optional.empty());

        // WHEN - THEN
        assertThrows(UserNotFoundException.class, () ->
                        userService.getUserById(userId),
                String.format("user %s not found.", userId)
        );
    }

    @Test
    void updateUser_return_updated_User() {
        // GIVEN
        UserResponseDto updatedUser = userResponseMapping(
                new User(
                        1L,
                        LocalDate.of(2023, 11, 20),
                        "John",
                        "Doe",
                        "user1",
                        "new-password",     // change of password
                        "1212 Main st",     // change of address
                        "apt 515",          // change of address
                        "Orlando",
                        "FL",
                        "32835",
                        Set.of(learner())
                )
        );

        User userUpdate = new User(
                null,
                null,
                null,
                null,
                null,
                "new-password",
                "1212 Main st",     // change of address
                "apt 515",          // change of address
                null,
                null,
                null,
                null
        );

        when(userRepository.findById(user1().getId())).thenReturn(Optional.of(user1()));

        // WHEN
        UserResponseDto result = userService.updateUser(user1().getId(), userUpdate);

        // THEN
        assertEquals(updatedUser.getUser().getId(), result.getUser().getId());
        assertEquals(updatedUser.getUser().getUsername(), result.getUser().getUsername());
        assertNotNull(result.getUser().getPassword());
        assertEquals(updatedUser.getUser().getAddress(), result.getUser().getAddress());
        assertEquals(updatedUser.getUser().getAddress2(), result.getUser().getAddress2());
    }

    @Test
    void updateUser_throws_UserNotFoundException() {
        // GIVEN
        Long userId = 0L;
        User userUpdate = new User(
                null,
                null,
                null,
                null,
                null,
                "new-password",
                "1212 Main st",     // change of address
                "apt 515",          // change of address
                null,
                null,
                null,
                null
        );

        when(userRepository.findById(user1().getId())).thenReturn(Optional.empty());

        // WHEN - THEN
        assertThrows(UserNotFoundException.class, () ->
                        userService.updateUser(userId, userUpdate),
                String.format("user %s not found.", userId)
        );
    }
}
