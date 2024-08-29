package com.codecamp.utils;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class StringFormatUtilsTest {

    @Test
    void capitalizeFirstChar_returns_capitalized_firstCharacter() {
        // GIVEN
        String firstname = "  Alonzo mourning  ";
        String capitalizedFirstName = "Alonzo Mourning";

        // WHEN
        String result = StringFormatUtils.capitalizeFirstChar(firstname);

        // THEN
        assertEquals(capitalizedFirstName, result);
    }

    @Test
    void createUserFormatErrorMessage_return_formatted_message() {
        // GIVEN
        String message = "\"could not execute statement [ERROR: duplicate key value violates unique " +
                "constraint \"ukk8d0f2n7n88w1a16yhua64onx Detail: Key (user_name)=(learner1) already exists.] " +
                "[insert into users (account_non_expired,account_non_locked,cohort_start_date,credentials_non_expired," +
                "enabled,first_name,last_name,password,user_name) values (?,?,?,?,?,?,?,?,?) returning id]\"";

        String formattedString = "Detail: Key (user_name)=(learner1) already exists.";

        // WHEN
        String result = StringFormatUtils.createUserFormatErrorMessage(message);

        // THEN
        assertEquals(formattedString, result);
    }
}
