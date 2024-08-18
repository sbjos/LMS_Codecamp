package com.codecamp.utils;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

public class TimeZoneConverterTest {

    @Test
    void  convertLocalTimeToUTC() {
        // WHEN
        LocalDateTime result = TimeZoneConverter.convertLocalTimeToUTC();

        // THEN
        System.out.println(result);
        Assertions.assertNotNull(result);
    }
}
