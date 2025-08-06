package com.codecamp.utils;

public class StringFormatUtils {

    public static String capitalizeFirstChar(String name) {
        char[] chars = name.toLowerCase().toCharArray();
        boolean found = true;

        for (int i = 0; i < chars.length; i++) {
            if (Character.isLetter(chars[i])) {
                if (found) {
                    chars[i] = Character.toUpperCase(chars[i]);
                }
                found = false;

            } else {
                found = true;
            }
        }

        return String.valueOf(chars).trim();
    }

    public static String createUserFormatErrorMessage(String input) {
        String result = null;

        if (input.contains("Detail")) {
            int start = input.indexOf("Detail");
            int end = input.indexOf("]");

            result = input.substring(start, end);
        }

        return result;
    }
}
