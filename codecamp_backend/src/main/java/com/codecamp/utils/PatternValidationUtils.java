package com.codecamp.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class PatternValidationUtils {
    private final static Pattern usernameRegex = Pattern.compile("^[a-zA-Z][a-zA-Z0-9-_]{3,23}$");
    private final static Pattern passwordRegex = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&])[a-zA-Z0-9!@#$%&]{8,24}$");
    private final static Pattern phoneRegex = Pattern.compile("^\\+[1]\\s[(]\\d{3}[)]\\s\\d{3}-\\d{4}$");
    private final static Pattern emailRegex = Pattern.compile("^[a-zA-Z][a-zA-Z0-9_.-]+@[a-z0A-Z-9_.-]+\\.[a-z]+$");
    private final static Pattern zipCodeRegex = Pattern.compile("^\\d{5}$");

    public static String usernamePattern(String userName) {
        String validUsername;
        Matcher matcher = usernameRegex.matcher(userName);

        if (matcher.find()) {
            validUsername = userName;
        } else {
            throw new  PatternSyntaxException("Wrong username format", null, -1);
        }

        return validUsername;
    }

    public static String passwordPattern(String phoneNumber) {
        String validPassword;
        Matcher matcher = passwordRegex.matcher(phoneNumber);

        if (matcher.find()) {
            validPassword = phoneNumber;
        } else {
            throw new  PatternSyntaxException("Wrong password format", null, -1);
        }

        return validPassword;
    }

    public static String phonePattern(String phoneNumber) {
        String validPhoneNumber;
        String formattedPhoneNumber = phoneNumberFormatting(phoneNumber);

        Matcher matcher = phoneRegex.matcher(formattedPhoneNumber);
        if (matcher.find()) {
            validPhoneNumber = formattedPhoneNumber;

        } else {
            throw new PatternSyntaxException("Wrong phone number format", null, -1);
        }

        return validPhoneNumber;
    }

    public static String emailPattern(String email) {
        String validEmail;
        Matcher matcher = emailRegex.matcher(email);

        if (matcher.find()) {
            validEmail = email;
        } else {
            throw new  PatternSyntaxException("Wrong email format", null, -1);
        }

        return validEmail;
    }

    public static String zipcodePattern(String zipcode) {
        String validZipcode;
        Matcher matcher = zipCodeRegex.matcher(zipcode);

        if (matcher.find()) {
            validZipcode = zipcode;
        } else {
            throw new  PatternSyntaxException("Wrong zipcode format", null, -1);
        }

        return validZipcode;
    }

    private static String phoneNumberFormatting(String phoneNumber) {
        String formattedPhoneNumber;
        int phoneNumberlength = phoneNumber.length();

        if (phoneNumber.length() == 10) {
            StringBuilder builder = new StringBuilder(phoneNumber.trim());
            String a = builder.substring(0, 3);
            String b = builder.substring(3, 6);
            String c = builder.substring(6, 10);

            formattedPhoneNumber = String.format("+1 (%s) %s-%s", a, b, c);

        } else {
            throw new PatternSyntaxException("Phone number length invalid", null, -1);
        }

        return formattedPhoneNumber;
    }
}

