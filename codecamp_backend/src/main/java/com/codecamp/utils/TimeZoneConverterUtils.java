package com.codecamp.utils;

import java.time.*;

public class TimeZoneConverterUtils {

    /**
     * Convert the actual  local system time to UTC.
     * @return utc time
     */
    public static LocalDateTime convertLocalTimeToUTC() {
         return OffsetDateTime.now(ZoneOffset.UTC).toLocalDateTime();
    }
}
