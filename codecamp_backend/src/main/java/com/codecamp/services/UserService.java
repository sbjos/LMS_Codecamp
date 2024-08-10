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
        return userResponseMapping(userLookup(id).get());
    }

    /**
     * Updates an existing user.
     * @param update updated user details
     * @return the updated assignment
     */
    public UserResponseDto updateUser(Long id, User update) {
        User user = userLookup(id).get();

        Optional.ofNullable(update.getFirstname()).ifPresent(user::setFirstname);
        Optional.ofNullable(update.getLastname()).ifPresent(user::setLastname);
        Optional.ofNullable(update.getUsername()).ifPresent(user::setUsername);
        Optional.ofNullable(update.getPassword()).ifPresent(user::setEncodedPassword);

        if (Optional.ofNullable(update.getContact()).isPresent()) {
            Optional.ofNullable(update.getContact().getPhone()).ifPresent(phone -> user.getContact().setPhone(phone));
            Optional.ofNullable(update.getContact().getEmail()).ifPresent(email -> user.getContact().setEmail(email));
        }

        if (Optional.ofNullable(update.getAddress()).isPresent()) {
            Optional.ofNullable(update.getAddress().getAddress()).ifPresent(address -> user.getAddress().setAddress(address));
            Optional.ofNullable(update.getAddress().getAddress2()).ifPresent(address2 -> user.getAddress().setAddress2(address2));
            Optional.ofNullable(update.getAddress().getCity()).ifPresent(city -> user.getAddress().setCity(city));
            Optional.ofNullable(update.getAddress().getState()).ifPresent(state -> user.getAddress().setState(state));
            Optional.ofNullable(update.getAddress().getZipcode()).ifPresent(zipcode -> user.getAddress().setZipcode(zipcode));
        }

        userRepository.save(user);

        return userResponseMapping(user);
    }

    /**
     * Creates a user
     * @param newUser the user information to create the new user
     */
    public void createUser(User newUser) {
        newUser.setEncodedPassword(newUser.getPassword());
        newUser.setAccountNonExpired(true);
        newUser.setAccountNonLocked(true);
        newUser.setCredentialsNonExpired(true);
        newUser.setEnabled(true);

        userRepository.save(newUser);
    }

    /**
     * Helper method that finds a user by username.
     * @param id user's username
     * @return user details
     * @throws UserNotFoundException user not found
     */
    private Optional<User> userLookup(Long id) {
        return Optional.ofNullable(userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException(String.format("user %s not found.", id)))
        );
    }
}
