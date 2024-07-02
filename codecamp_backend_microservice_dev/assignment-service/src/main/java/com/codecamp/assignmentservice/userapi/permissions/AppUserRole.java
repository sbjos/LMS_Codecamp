package com.codecamp.assignmentservice.userapi.permissions;

import com.google.common.collect.Sets;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.codecamp.assignmentservice.userapi.permissions.AppUserPermission.*;

public enum AppUserRole {

    LEARNER(Sets.newHashSet(CREATE, EDIT, VIEW)),
    REVIEWER(Sets.newHashSet(CLAIM, RECLAIM, REJECT, COMPLETE)),
    ADMIN(Sets.newHashSet(CREATE, EDIT, VIEW, CLAIM, RECLAIM, REJECT, COMPLETE));

    private final Set<AppUserPermission> appUserPermissions;

    AppUserRole(Set<AppUserPermission> appUserPermissions) {
        this.appUserPermissions = appUserPermissions;
    }

    public Set<AppUserPermission> getPermissions() {
        return appUserPermissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(appUserPermission -> new SimpleGrantedAuthority(appUserPermission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}
