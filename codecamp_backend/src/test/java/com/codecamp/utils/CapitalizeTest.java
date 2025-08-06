package com.codecamp.utils;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CapitalizeTest {

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
}
