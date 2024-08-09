package com.codecamp.testhelper;

import com.codecamp.entities.Address;

import static com.codecamp.testhelper.TestUserHelper.*;

public final class TestAddressHelper {

    public static Address addressUser1() {
        return new Address(
                1L,
                "123 Main st",
                "password",
                "Orlando",
                "FL",
                "32835"
        );
    }

    public static Address addressUser2() {
        return new Address(
                2L,
                "456 Main st",
                "password",
                "Sanford",
                "FL",
                "32771"
        );
    }

    public static Address addressUser3() {
        return new Address(
                3L,
                "789 Main st",
                "password",
                "Memphis",
                "TN",
                "32771"
        );
    }

    public static Address addressReviewer1() {
        return new Address(
                4L,
                "147 Main st",
                "password",
                "Auburndale",
                "FL",
                "33823"
        );
    }
}
