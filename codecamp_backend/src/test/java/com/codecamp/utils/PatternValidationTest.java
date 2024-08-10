package com.codecamp.utils;

import org.junit.jupiter.api.Test;

import java.util.regex.PatternSyntaxException;

import static org.junit.jupiter.api.Assertions.*;

public class PatternValidationTest {

    @Test
    void phonePattern_with_correct_format() {
        // GIVEN
        String phoneNumber = "+1-252-000-5365";

        // WHEN
        String result = PatternValidation.phonePattern(phoneNumber);

        // THEN
        assertEquals(phoneNumber, result);
    }

    @Test
    void phonePattern_with_incorrect_format_throws_PatternSyntaxException() {
        // GIVEN
        String phoneNumber = "+1(252) 000-5365";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidation.phonePattern(phoneNumber),
                "Wrong phone number pattern"
        );
    }

    @Test
    void emailPattern_with_correct_format() {
        // GIVEN
        String phoneNumber = "usernae@domain.subdomain.com";

        // WHEN
        String result = PatternValidation.emailPattern(phoneNumber);

        // THEN
        assertEquals(phoneNumber, result);
    }

    @Test
    void emailPattern_with_correct_format_and_subdomain() {
        // GIVEN
        String phoneNumber = "usernae@domain.com";

        // WHEN
        String result = PatternValidation.emailPattern(phoneNumber);

        // THEN
        assertEquals(phoneNumber, result);
    }

    @Test
    void emailPattern_with_incorrect_format_throws_PatternSyntaxException() {
        // GIVEN
        String phoneNumber = "username#domain.com";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidation.emailPattern(phoneNumber),
                "Wrong phone number pattern"
        );
    }

    @Test
    void zipcodePattern_with_correct_format() {
        // GIVEN
        String phoneNumber = "33058";

        // WHEN
        String result = PatternValidation.zipcodePattern(phoneNumber);

        // THEN
        assertEquals(phoneNumber, result);
    }

    @Test
    void zipcodePattern_with_incorrect_format_throws_PatternSyntaxException() {
        // GIVEN
        String phoneNumber = "3 0 3 2 2";

        // WHEN - THEN
        assertThrows(PatternSyntaxException.class,
                () -> PatternValidation.zipcodePattern(phoneNumber),
                "Wrong phone number pattern"
        );
    }
}
