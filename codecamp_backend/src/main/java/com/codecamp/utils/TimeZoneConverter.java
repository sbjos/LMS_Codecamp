package com.codecamp.utils;

import java.time.*;

public class TimeZoneConverter {

    /**
     * Convert the actual  local system time to UTC.
     * @return utc time
     */
    public static LocalDateTime convertLocalTimeToUTC() {
         LocalDateTime a = OffsetDateTime.now(ZoneOffset.UTC).toLocalDateTime();

        return a;
    }
}
