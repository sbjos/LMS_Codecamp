package com.codecamp.utils;

import org.junit.jupiter.api.Test;

import java.util.regex.PatternSyntaxException;

import static org.junit.jupiter.api.Assertions.*;

public class PatternValidationTest {

    @Test
    void usernamePattern_returns_correct_format() {
        // GIVEN
        String username = "user1";
        String formattedUsername = "user1";

        // WHEN
        String result = PatternValidationUtils.usernamePattern(username);

        // THEN
        assertEquals(formattedUsername, result);
    }

    @Test
    void usernamePattern_with_invalid_character_throws_PatternSyntaxException() {
        // GIVEN
        String username = "@user1";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidationUtils.phonePattern(username),
                "Wrong username format"
        );
    }

    @Test
    void usernamePattern_with_invalid_format_length_throws_PatternSyntaxException() {
        // GIVEN
        String username = "us";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidationUtils.usernamePattern(username),
                "Wrong username format"
        );
    }

    @Test
    void passwordPattern_returns_correct_format() {
        // GIVEN
        String password = "@Passw0rd";
        String formattedPassword = "@Passw0rd";

        // WHEN
        String result = PatternValidationUtils.passwordPattern(password);

        // THEN
        assertEquals(formattedPassword, result);
    }

    @Test
    void passwordPattern_with_incorrect_format_throws_PatternSyntaxException() {
        // GIVEN
        String phoneNumber = "password123";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidationUtils.passwordPattern(phoneNumber),
                "Wrong password format"
        );
    }

    @Test
    void passwordPattern_with_incorrect_format_length_throws_PatternSyntaxException() {
        // GIVEN
        String phoneNumber = "pass";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidationUtils.passwordPattern(phoneNumber),
                "Wrong password format"
        );
    }

    @Test
    void passwordPattern_with_invalid_character_throws_PatternSyntaxException() {
        // GIVEN
        String phoneNumber = "(@Passw0rd";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidationUtils.passwordPattern(phoneNumber),
                "Wrong password format"
        );
    }

    @Test
    void phonePattern_returns_correct_format() {
        // GIVEN
        String phoneNumber = "2520005365";
        String formattedPhoneNumber = "+1 (252) 000-5365";

        // WHEN
        String result = PatternValidationUtils.phonePattern(phoneNumber);

        // THEN
        assertEquals(formattedPhoneNumber, result);
    }

    @Test
    void phonePattern_with_incorrect_format_throws_PatternSyntaxException() {
        // GIVEN
        String phoneNumber = "+1 252 000-5365";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidationUtils.phonePattern(phoneNumber),
                "Wrong phone number format"
        );
    }

    @Test
    void phonePattern_with_incorrect_format_length_throws_PatternSyntaxException() {
        // GIVEN
        String phoneNumber = "252569874";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidationUtils.phonePattern(phoneNumber),
                "Wrong phone number format"
        );
    }

    @Test
    void emailPattern_with_correct_format() {
        // GIVEN
        String email = "usernae@domain.com";

        // WHEN
        String result = PatternValidationUtils.emailPattern(email);

        // THEN
        assertEquals(email, result);
    }

    @Test
    void emailPattern_with_correct_format_and_subdomain() {
        // GIVEN
        String email = "usernae@domain.subdomain.com";

        // WHEN
        String result = PatternValidationUtils.emailPattern(email);

        // THEN
        assertEquals(email, result);
    }

    @Test
    void emailPattern_with_incorrect_format_throws_PatternSyntaxException() {
        // GIVEN
        String phoneNumber = "username#domain.com";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidationUtils.emailPattern(phoneNumber),
                "Wrong email format"
        );
    }

    @Test
    void zipcodePattern_with_correct_format() {
        // GIVEN
        String zipcode = "33058";

        // WHEN
        String result = PatternValidationUtils.zipcodePattern(zipcode);

        // THEN
        assertEquals(zipcode, result);
    }

    @Test
    void zipcodePattern_with_incorrect_format_throws_PatternSyntaxException() {
        // GIVEN
        String zipcode = "3 0 3 2 2";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidationUtils.zipcodePattern(zipcode),
                "Wrong zipcode format"
        );
    }
}
