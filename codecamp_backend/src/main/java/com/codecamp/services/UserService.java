package com.codecamp.services;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.User;
import com.codecamp.exceptions.UserNotFoundException;
import com.codecamp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.codecamp.utils.ObjectMapping.userResponseMapping;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get a user by username
     * @param id user id
     * @return user details
     */
    public UserResponseDto getUserById(Long id) {
        return userResponseMapping(userLookup(id));
    }

    /**
     * Gets a user by username
     * @param username
     * @return
     */
    public UserResponseDto getUserByUsername(String username) {
        Optional<User> user = Optional.ofNullable(userRepository.findByUsername(username).orElseThrow(
                () -> new UserNotFoundException(String.format("user %s not found.", username)))
        );

        return userResponseMapping(user.get());
    }

    /**
     * Updates an existing user.
     * @param update updated user details
     * @return the updated assignment
     */
    public UserResponseDto updateUser(Long id, User update) {
        User user = userLookup(id);

        Optional.ofNullable(update.getFirstname()).ifPresent(user::setFirstname);
        Optional.ofNullable(update.getLastname()).ifPresent(user::setLastname);
        Optional.ofNullable(update.getUsername()).ifPresent(user::setUsername);
        Optional.ofNullable(update.getPassword()).ifPresent(user::setEncodedPassword);
        Optional.ofNullable(update.getAddress()).ifPresent(user::setAddress);
        Optional.ofNullable(update.getAddress2()).ifPresent(user::setAddress2);
        Optional.ofNullable(update.getCity()).ifPresent(user::setCity);
        Optional.ofNullable(update.getState()).ifPresent(user::setState);
        Optional.ofNullable(update.getZipcode()).ifPresent(user::setZipcode);

        userRepository.save(user);

        return userResponseMapping(user);
    }

    /**
     * Creates a user
     * @param newUser the user information to create the new user
     */
    public void createUser(User newUser) {
        newUser.setEncodedPassword(newUser.getPassword());
        userRepository.save(newUser);
    }

    /**
     * Helper method that finds a user by username.
     * @param id user's username
     * @return user details
     * @throws UserNotFoundException user not found
     */
    private User userLookup(Long id) {
        return userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException(String.format("user %s not found.", id))
        );
    }
}
