package com.codecamp.filters;

import com.codecamp.dto.AuthCredentialRequest;
import com.codecamp.entities.User;
import com.codecamp.repositories.UserRepository;
import com.codecamp.utils.JWTUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

/**
 * Authentication component class
 */
@Component
public class UserAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    public UserAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
        setFilterProcessesUrl("/api/auth/login");
    }

    /**
     * Attempt to authenticate to the service.
     * @param request  from which to extract parameters and perform the authentication.
     * @param response the response, which may be needed if the implementation has to do a
     *                 redirect as part of a multi-stage authentication process (such as OpenID).
     * @return the user Authentication confirmation.
     * @throws AuthenticationException
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        AuthCredentialRequest authRequest;
        try {
            authRequest = new ObjectMapper().readValue(
                    request.getInputStream(),
                    AuthCredentialRequest.class
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(),
                authRequest.getPassword()
        );

        return authenticationManager.authenticate(authentication);
    }

    /**
     * Generates a token and add that token to the response header after a successful authentication.
     * @param request
     * @param response
     * @param chain
     * @param authResult the object returned from the <tt>attemptAuthentication</tt>
     *                   method.
     * @throws IOException
     * @throws ServletException
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        User user = userRepository.findByUsername(authResult.getName()).orElse(null);
        String token = jwtUtils.generateToken(user);

        response.addHeader("Authorization", "Bearer " + token);
        response.addHeader("Authority", List.of(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getUsername(),
                user.getAuthorities()).toString()
        );
    }
}
