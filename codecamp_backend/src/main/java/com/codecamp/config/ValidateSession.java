package com.codecamp.config;

import com.codecamp.entities.User;
import com.codecamp.repositories.UserRepository;
import com.codecamp.utils.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ValidateSession {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    /**
     * Validate session by regenerating a new token and matches authority from request with user information.
     * @param request Http server request
     * @param response Http server response
     * @return Http status
     */
    @GetMapping(value = "/api/auth/validate")
    public ResponseEntity<?> validate(HttpServletRequest request, HttpServletResponse response) {
        String a = request.getHeader("Authority");
        List<String> authority = List.of(request.getHeader("Authority").split(","));
        User user = userRepository.findByUsername(authority.get(3).trim()).orElse(null);

        if (doesMatch(authority, user)) {
            response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + jwtUtils.generateToken(user));
            response.addHeader("Authority", List.of(
                    user.getId(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getUsername(),
                    user.getAuthorities()).toString()
            );
            return new ResponseEntity<>(HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Verifies if the response authority matches the user.
     * @param value Value passed by the client trough headers
     * @param user User data from database
     * @return boolean value
     */
    private boolean doesMatch(List<String> value, User user) {
        boolean match = false;

        List<String> userDetails = List.of(
                user.getId().toString(),
                user.getFirstname(),
                user.getLastname(),
                user.getUsername(),
                user.getAuthorities().toString()
        );

        for (int i = 0; i < value.size(); i++) {
            if (value.get(i).trim().equals(userDetails.get(i).trim())) {
                match = true;
            } else {
                match = false;
                break;
            }
        }

        return match;
    }
}
