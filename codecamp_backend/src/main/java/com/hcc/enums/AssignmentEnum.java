package com.hcc.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {

    // Learner
    CREATE(1, "Create"),
    EDIT(2, "edit"),

    // Learner / Reviewer
    VIEW(3, "view"),

    // Reviewer
    CLAIM(4, "claim"),
    COMPLETE(5, "complete"),
    REJECT(6, "needs work"),
    RECLAIM(7, "reclaim");

    private final int number;

    private final String permission;

    AssignmentEnum(int number, String permission) {
        this.number = number;
        this.permission = permission;
    }

    public int getNumber() {
        return number;
    }

    public String getPermission() {
        return permission;
    }
}
