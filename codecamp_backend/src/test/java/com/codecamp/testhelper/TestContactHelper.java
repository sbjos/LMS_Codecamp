package com.codecamp.testhelper;

import com.codecamp.entities.Contact;

public final class TestContactHelper {

    public static Contact contactUser1() {
        return new Contact(
                "4045258855",
                "user1@mail.com"
        );
    }

    public static Contact contactUser2() {
        return new Contact(
                "4415003333",
                "user2@mail.com"
        );
    }

    public static Contact contactUser3() {
        return new Contact(
                "2120258962",
                "user3@mail.com"
        );
    }

    public static Contact contactReviewer1() {
        return new Contact(
                "1022531258",
                "reviewer@mail.com"
        );
    }
}
