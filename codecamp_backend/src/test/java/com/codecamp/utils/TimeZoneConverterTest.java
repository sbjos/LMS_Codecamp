package com.codecamp.utils;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class TimeZoneConverterTest {

    @Test
    void  convertLocalTimeToUTC_return_time_in_UTC() {
        // WHEN
        LocalDateTime result = TimeZoneConverterUtils.convertLocalTimeToUTC();

        // THEN
        System.out.println(result);
        assertNotNull(result);
    }
}
