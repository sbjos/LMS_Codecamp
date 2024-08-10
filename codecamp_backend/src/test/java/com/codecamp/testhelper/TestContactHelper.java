package com.codecamp.testhelper;

import com.codecamp.entities.Contact;

import static com.codecamp.testhelper.TestUserHelper.*;

public final class TestContactHelper {

    public static Contact contactUser1() {
        return new Contact(
                "+1-404-525-8855",
                "user1@mail.com"
        );
    }

    public static Contact contactUser2() {
        return new Contact(
                "+1-441-500-3333",
                "user2@mail.com"
        );
    }

    public static Contact contactUser3() {
        return new Contact(
                "+1-212-025-8962",
                "user3@mail.com"
        );
    }

    public static Contact contactReviewer1() {
        return new Contact(
                "+1-102-253-1258",
                "reviewer@mail.com"
        );
    }
}
