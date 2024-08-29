package com.codecamp.services;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.User;
import com.codecamp.exceptions.EmailAlreadyExistException;
import com.codecamp.exceptions.UserNotFoundException;
import com.codecamp.exceptions.UsernameAlreadyExistException;
import com.codecamp.repositories.UserRepository;
import com.codecamp.utils.StringFormatUtils;
import com.codecamp.utils.TimeZoneConverterUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.codecamp.utils.StringFormatUtils.capitalizeFirstChar;
import static com.codecamp.utils.ObjectMappingUtils.userResponseMapping;
import static com.codecamp.utils.PatternValidationUtils.*;

@Service
public class UserService {

    private final Logger log = LogManager.getLogger(UserService.class);

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
    public UserResponseDto updateUserById(Long id, User update) {
        User user = userLookup(id).get();

        Optional.ofNullable(update.getFirstname()).ifPresent(firstname -> user.setFirstname(firstname.trim()));
        Optional.ofNullable(update.getLastname()).ifPresent(lastname -> user.setLastname(lastname.trim()));
        Optional.ofNullable(update.getUsername()).ifPresent(username -> user.setUsername(username.trim()));
        Optional.ofNullable(update.getPassword()).ifPresent(password -> user.setEncodedPassword(password.trim()));

        if (Optional.ofNullable(update.getContact()).isPresent()) {
            Optional.ofNullable(update.getContact().getPhone()).ifPresent(phone -> user.getContact().setPhone(phone.trim()));
            Optional.ofNullable(update.getContact().getEmail()).ifPresent(email -> user.getContact().setEmail(email.trim()));
        }

        if (Optional.ofNullable(update.getAddress()).isPresent()) {
            Optional.ofNullable(update.getAddress().getNumber()).ifPresent(address2 -> user.getAddress().setNumber(address2.trim()));
            Optional.ofNullable(update.getAddress().getStreet()).ifPresent(address -> user.getAddress().setStreet(address.trim()));
            Optional.ofNullable(update.getAddress().getCity()).ifPresent(city -> user.getAddress().setCity(city.trim()));
            Optional.ofNullable(update.getAddress().getState()).ifPresent(state -> user.getAddress().setState(state.trim()));
            Optional.ofNullable(update.getAddress().getZipcode()).ifPresent(zipcode -> user.getAddress().setZipcode(zipcode.trim()));
        }

        userRepository.save(user);

        return userResponseMapping(user);
    }

    /**
     * Creates a user
     * @param newUser the user information to create the new user
     */
    public void createUser(User newUser) {
        try {
            newUser.setCohortStartDate(TimeZoneConverterUtils.convertLocalTimeToUTC());
            newUser.setFirstname(capitalizeFirstChar(newUser.getFirstname()));
            newUser.setLastname(capitalizeFirstChar(newUser.getLastname()));
            newUser.setUsername(usernamePattern(newUser.getUsername().trim()));
            newUser.setEncodedPassword(passwordPattern(newUser.getPassword().trim()));
            newUser.getContact().setPhone(phonePattern(newUser.getContact().getPhone().trim()));
            newUser.getContact().setEmail(emailPattern(newUser.getContact().getEmail().trim()));
            newUser.getAddress().setStreet(capitalizeFirstChar(newUser.getAddress().getStreet()));
            newUser.getAddress().setNumber(newUser.getAddress().getNumber().trim());
            newUser.getAddress().setCity(capitalizeFirstChar(newUser.getAddress().getCity()));
            newUser.getAddress().setState(newUser.getAddress().getState().trim());
            newUser.getAddress().setZipcode(zipcodePattern(newUser.getAddress().getZipcode().trim()));
            newUser.getAuthorities();
            newUser.setAccountNonExpired(true);
            newUser.setAccountNonLocked(true);
            newUser.setCredentialsNonExpired(true);
            newUser.setEnabled(true);

            userRepository.save(newUser);

        } catch (DataIntegrityViolationException e) {
            log.warn(e, new DataIntegrityViolationException(""));

            String error = StringFormatUtils.createUserFormatErrorMessage(e.getMessage());

            if (error.contains("username")) {
                throw new UsernameAlreadyExistException(error);

            } else if (error.contains("email")) {
                throw new EmailAlreadyExistException(error);
            }
        }
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
