package com.hcc.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {

    SUBMITTED(1, "Submitted"),
    IN_REVIEW(2, "In review"),
    NEEDS_WORK(3, "Needs work"),
    COMPLETED(4, "Completed");

    private final int number;

    private final String status;

    AssignmentStatusEnum(int number, String status) {
        this.number = number;
        this.status = status;
    }

    public int getNumber() {
        return number;
    }

    public String getStatus() {
        return status;
    }
}
