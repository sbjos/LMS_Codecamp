package com.codecamp.userservice.permissions;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AppUserPermission {

    CREATE(1, "Create"),
    EDIT(2, "Edit"),
    VIEW(3, "View"),
    CLAIM(4, "Claim"),
    RECLAIM(5, "Reclaim"),
    REJECT(6, "Reject"),
    COMPLETE(7, "Complete");

    private final int number;

    private final String permission;

    AppUserPermission(int number, String permission) {
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
