package com.codecamp.config;

import com.codecamp.filters.JWTFilter;
import com.codecamp.services.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;

import static com.codecamp.enums.AuthorityEnum.ADMIN;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private UserDetailServiceImpl userDetailServiceImpl;

    @Autowired
    private CustomPasswordEncoder customPasswordEncoder;

    @Autowired
    private JWTFilter jwtFilter;

    @Bean/*(name = BeanIds.AUTHENTICATION_MANAGER)*/
    public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
        auth.userDetailsService(userDetailServiceImpl).passwordEncoder(customPasswordEncoder.getPasswordEncoder());
        return auth.build();
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(crossSite -> crossSite.disable())
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(handling -> handling.authenticationEntryPoint((request, response, exception) -> {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, exception.getMessage());
                }))
                .authorizeHttpRequests(authRequest -> authRequest
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/user/**").permitAll() // For testing purposes
                .requestMatchers("/api/admin/user/**").hasAuthority(ADMIN.name())
                .anyRequest().authenticated());

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


