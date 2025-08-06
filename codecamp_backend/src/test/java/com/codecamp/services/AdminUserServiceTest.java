package com.codecamp.services;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.Address;
import com.codecamp.entities.Contact;
import com.codecamp.entities.User;
import com.codecamp.exceptions.UserNotFoundException;
import com.codecamp.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import static com.codecamp.testhelper.TestAddressHelper.addressUser1;
import static com.codecamp.testhelper.TestAuthorityHelper.learner;
import static com.codecamp.testhelper.TestContactHelper.contactUser1;
import static com.codecamp.testhelper.TestUserHelper.user1;
import static com.codecamp.utils.ObjectMappingUtils.userResponseMapping;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RestController
public class AdminUserServiceTest {

    @InjectMocks
    private AdminUserService adminUserService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserByUsername_returns_user() {
        // GIVEN
        UserResponseDto user = userResponseMapping(user1());
        when(userRepository.findByUsername(user1().getUsername())).thenReturn(Optional.of(user1()));

        // WHEN
        UserResponseDto result = adminUserService.getUserByUsername(user1().getUsername());

        // THEN
        assertEquals(user.getUsername(), result.getUsername());
    }

    @Test
    void getUserByUsername_throws_UserNotFoundException() {
        // GIVEN
        String username = "non-existent";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        // WHEN - THEN
        assertThrows(UserNotFoundException.class, () ->
                        adminUserService.getUserByUsername(username),
                String.format("user %s not found.", username)
        );
    }

    @Test
    void updateUser_return_updated_User() {
        // GIVEN
        Contact contactUpdated = new Contact(
                "4011456325",
                "change@mail.com"
        );

        Address addressUpdated = new Address(
                "1212 Main st",
                "apt 515",
                "Orlando",
                "FL",
                "32835"
        );

        UserResponseDto updatedUser = userResponseMapping(
                new User(
                        LocalDateTime.of(2023, 11, 20, 17, 52, 51),
                        "John",
                        "Doe",
                        "user1",
                        "new-password",
                        Set.of(learner()),
                        contactUpdated,
                        addressUpdated,
                        true,
                        true,
                        true,
                        true
                )
        );

        User userUpdate = new User(
                null,
                null,
                null,
                null,
                null,
                null,
                contactUpdated,
                addressUpdated,
                true,
                true,
                true,
                true
        );

        when(userRepository.findByUsername(user1().getUsername())).thenReturn(Optional.of(user1()));

        // WHEN
        UserResponseDto result = adminUserService.updateUser(user1().getUsername(), userUpdate);

        // THEN
        assertEquals(updatedUser.getUsername(), result.getUsername());
        assertEquals(updatedUser.getContact(), result.getContact());
        assertEquals(updatedUser.getAddress(), result.getAddress());
    }

    @Test
    void updateUserSettings_set_Account_to_Disabled_return_updated_User() {
        // GIVEN
        UserResponseDto updatedUser = userResponseMapping(
                new User(
                        LocalDateTime.of(2023, 11, 20, 17, 52, 51),
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
                        false
                )
        );

        User userUpdate = new User(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                true,
                true,
                true,
                false
        );

        when(userRepository.findByUsername(user1().getUsername())).thenReturn(Optional.of(user1()));

        // WHEN
        UserResponseDto result = adminUserService.updateUserSettings(user1().getUsername(), userUpdate);

        // THEN
        assertEquals(updatedUser.getUsername(), result.getUsername());
        assertEquals(updatedUser.isEnabled(), result.isEnabled());
    }

    @Test
    void updateUser_throws_UserNotFoundException() {
        // GIVEN
        String username = "non-existent";
        User userUpdate = new User(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                true,
                true,
                true,
                true
        );

        when(userRepository.findByUsername(user1().getUsername())).thenReturn(Optional.empty());

        // WHEN - THEN
        assertThrows(UserNotFoundException.class, () ->
                        adminUserService.updateUser(username, userUpdate),
                String.format("user %s not found.", username)
        );
    }
}
