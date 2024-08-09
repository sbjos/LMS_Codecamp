package com.codecamp.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class PatternValidation {
    private final static Pattern phonePattern = Pattern.compile("^\\+\\d{1}-\\d{3}-\\d{3}-\\d{4}$");
    private final static Pattern emailPattern = Pattern.compile("^\\+\\d{1}\\s{1}\\(\\d{3}\\)\\s{1}\\d{3}-\\d{4}$");
    private final static Pattern zipCodePattern = Pattern.compile("^\\d{5}$");

    public static String phonePattern(String phoneNumber) {
        String validNumber = null;
        Matcher matcher = phonePattern.matcher(phoneNumber);

        if (matcher.find()) {
            validNumber = phoneNumber;
        } else {
            throw new  PatternSyntaxException("Wrong phone number pattern", null, -1);
        }

        return validNumber;
    }

    public static String emailPattern(String email) {
        String validNumber = null;
        Matcher matcher = emailPattern.matcher(email);

        if (matcher.find()) {
            validNumber = email;
        } else {
            throw new  PatternSyntaxException("Wrong email pattern", null, -1);
        }

        return validNumber;
    }

    public static String zipcodePattern(String zipcode) {
        String validNumber = null;
        Matcher matcher = zipCodePattern.matcher(zipcode);

        if (matcher.find()) {
            validNumber = zipcode;
        } else {
            throw new  PatternSyntaxException("Wrong zipcode pattern", null, -1);
        }

        return validNumber;
    }
}
