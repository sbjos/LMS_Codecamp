package com.codecamp.services;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.User;
import com.codecamp.exceptions.UserNotFoundException;
import com.codecamp.repositories.UserRepository;
import com.codecamp.utils.ObjectMappingUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.codecamp.utils.ObjectMappingUtils.userResponseMapping;

@Service
public class AdminUserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Gets a list of all users from the admin portal.
     * @return A list of all users
     */
    // TODO: Look in to paginating this baby
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(ObjectMappingUtils::userResponseMapping)
                .collect(Collectors.toList());
    }

    /**
     * Gets a user by username from the admin portal.
     * @param username user's username
     * @return a user
     */
    public UserResponseDto getUserByUsername(String username) {
        return userResponseMapping(userLookup(username).get());
    }

    /**
     * Updates an existing user from the admin portal.
     * @param update updated user details
     * @return the updated assignment
     */
    public UserResponseDto updateUser(String username, User update) {
        User user = userLookup(username).get();

        Optional.ofNullable(update.getFirstname()).ifPresent(user::setFirstname);
        Optional.ofNullable(update.getLastname()).ifPresent(user::setLastname);
        Optional.ofNullable(update.getUsername()).ifPresent(user::setUsername);

        Optional.ofNullable(update.getContact().getPhone()).ifPresent(email -> user.getContact().setPhone(email));
        Optional.ofNullable(update.getContact().getEmail()).ifPresent(email -> user.getContact().setEmail(email));

        Optional.ofNullable(update.getAddress().getStreet()).ifPresent(address -> user.getAddress().setStreet(address));
        Optional.ofNullable(update.getAddress().getNumber()).ifPresent(address2 -> user.getAddress().setNumber(address2));
        Optional.ofNullable(update.getAddress().getCity()).ifPresent(city -> user.getAddress().setCity(city));
        Optional.ofNullable(update.getAddress().getState()).ifPresent(state -> user.getAddress().setState(state));
        Optional.ofNullable(update.getAddress().getZipcode()).ifPresent(zipcode -> user.getAddress().setZipcode(zipcode));

        userRepository.save(user);

        return userResponseMapping(user);
    }

    /**
     * Updates a user settings for access to the application from the admin portal.
     * @param username a user's username
     * @param userAccessUpdate user access update
     */
    public UserResponseDto updateUserSettings(String username, User userAccessUpdate) {
        User user = userLookup(username).get();

        Optional.of(userAccessUpdate.isAccountNonExpired()).ifPresent(user::setAccountNonExpired);
        Optional.of(userAccessUpdate.isAccountNonLocked()).ifPresent(user::setAccountNonLocked);
        Optional.of(userAccessUpdate.isCredentialsNonExpired()).ifPresent(user::setCredentialsNonExpired);
        Optional.of(userAccessUpdate.isEnabled()).ifPresent(user::setEnabled);

        userRepository.save(user);

        return userResponseMapping(user);
    }

    /**
     * Helper method that finds a user by username.
     * @param username user's username
     * @return user details
     * @throws UserNotFoundException user not found
     */
    private Optional<User> userLookup(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username).orElseThrow(
                () -> new UserNotFoundException(String.format("user %s not found.", username)))
        );
    }
}

